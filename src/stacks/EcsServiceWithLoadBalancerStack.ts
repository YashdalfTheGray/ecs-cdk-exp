import { Stack, App, StackProps } from 'aws-cdk-lib';
import { Cluster, TaskDefinition, LaunchType } from 'aws-cdk-lib/aws-ecs';
import {
  ApplicationLoadBalancedEc2Service,
  ApplicationLoadBalancedFargateService,
} from 'aws-cdk-lib/aws-ecs-patterns';

type EcsServiceWithLoadBalancerStackProps = {
  cluster: Cluster;
  taskDefinition: TaskDefinition;
  launchType: LaunchType;
  desiredCount?: number;
  serviceName?: string;
  lbName?: string;
} & StackProps;

export class EcsServiceWithLoadBalancerStack extends Stack {
  public service:
    | ApplicationLoadBalancedEc2Service
    | ApplicationLoadBalancedFargateService;
  public launchType: LaunchType;
  public serviceName: string;

  constructor(
    scope: App,
    id: string,
    props: EcsServiceWithLoadBalancerStackProps
  ) {
    super(scope, id, props);

    const {
      launchType,
      cluster,
      taskDefinition,
      desiredCount,
      serviceName,
      lbName,
    } = props;

    this.launchType = launchType;
    this.serviceName = serviceName || `${id}Service`;

    const commonOptions = {
      cluster,
      taskDefinition,
      serviceName: this.serviceName,
      desiredCount: desiredCount || 1,
      loadBalancerName: lbName,
      publicLoadBalancer: true,
      openListener: true,
      vpc: cluster.vpc,
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
  }
}
