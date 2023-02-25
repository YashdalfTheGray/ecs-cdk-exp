import { Stack, App, StackProps } from 'aws-cdk-lib';
import { Cluster, TaskDefinition, LaunchType } from 'aws-cdk-lib/aws-ecs';
import {
  ApplicationLoadBalancedEc2Service,
  ApplicationLoadBalancedEc2ServiceProps,
  ApplicationLoadBalancedFargateService,
  ApplicationLoadBalancedFargateServiceProps,
} from 'aws-cdk-lib/aws-ecs-patterns';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

type EcsServiceWithAlbStackProps = {
  cluster: Cluster;
  taskDefinition: TaskDefinition;
  launchType: LaunchType;
  desiredCount?: number;
  serviceName?: string;
  loadBalancerName?: string;
  loadBalancer?: ApplicationLoadBalancer;
} & StackProps;

export class EcsServiceWithAlbStack extends Stack {
  public service:
    | ApplicationLoadBalancedEc2Service
    | ApplicationLoadBalancedFargateService;
  public loadBalancer: ApplicationLoadBalancer;
  public launchType: LaunchType;
  public serviceName: string;

  constructor(scope: App, id: string, props: EcsServiceWithAlbStackProps) {
    super(scope, id, props);

    const {
      launchType,
      cluster,
      taskDefinition,
      desiredCount,
      serviceName,
      loadBalancerName,
      loadBalancer,
    } = props;

    this.launchType = launchType;
    this.serviceName = serviceName || `${id}Service`;

    if (loadBalancerName && loadBalancer) {
      throw new TypeError(
        'Only one of `lbName` or `loadBalancer` can be specified'
      );
    }

    const commonOptions:
      | ApplicationLoadBalancedEc2ServiceProps
      | ApplicationLoadBalancedFargateServiceProps = {
      cluster,
      taskDefinition,
      serviceName: this.serviceName,
      desiredCount: desiredCount || 1,
      loadBalancerName,
      loadBalancer,
      publicLoadBalancer: true,
      openListener: true,
    };

    switch (launchType) {
      case LaunchType.EXTERNAL:
        throw new TypeError(
          'Services using EXTERNAL launch type are not supported in this repo.'
        );
      case LaunchType.EC2:
        this.service = new ApplicationLoadBalancedEc2Service(
          this,
          this.serviceName,
          commonOptions
        );
        break;
      case LaunchType.FARGATE:
        this.service = new ApplicationLoadBalancedFargateService(
          this,
          this.serviceName,
          commonOptions
        );
    }

    this.loadBalancer = this.service.loadBalancer;
  }
}
