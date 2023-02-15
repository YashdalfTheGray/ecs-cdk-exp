import { Stack, App, StackProps } from 'aws-cdk-lib';
import {
  InstanceType,
  InstanceClass,
  InstanceSize,
  SubnetType,
  SecurityGroup,
  Peer,
  Port,
} from 'aws-cdk-lib/aws-ec2';

import { Cluster } from 'aws-cdk-lib/aws-ecs';

type EcsClusterWithCapacityStackProps = { clusterName?: string } & StackProps;

export class EcsClusterWithCapacityStack extends Stack {
  public cluster: Cluster;
  public securityGroup: SecurityGroup;

  constructor(
    scope: App,
    id: string,
    props?: EcsClusterWithCapacityStackProps
  ) {
    super(scope, id, props);

    this.cluster = new Cluster(this, 'EcsCluster', {
      clusterName: props?.clusterName || 'EcsClusterWithCapacity',
      capacity: {
        instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
        autoScalingGroupName: `${id}ClusterAsg`,
        associatePublicIpAddress: true,
        keyName: 'ssh-access',
        vpcSubnets: { subnetType: SubnetType.PUBLIC },
      },
    });

    this.securityGroup = new SecurityGroup(this, 'EcsSecurityGroup', {
      vpc: this.cluster.vpc,
    });

    this.securityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(80));
    this.securityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(22));
  }
}
