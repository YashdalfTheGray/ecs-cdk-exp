import 'source-map-support/register';

import * as dotenv from 'dotenv';
import { App } from 'aws-cdk-lib';

import {
  EcsClusterWithCapacityStack,
  TaskdefStack,
  EcsServiceWithAlbStack,
} from './stacks';
import { LaunchType } from 'aws-cdk-lib/aws-ecs';

dotenv.config();

const app = new App();

const commonEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const clusterStack = new EcsClusterWithCapacityStack(
  app,
  'EcsLbExpClusterStack',
  {
    env: commonEnv,
    clusterName: 'EcsLbExperiment',
  }
);

const taskdefStack = new TaskdefStack(app, 'EcsLbExpTaskdefStack', {
  env: commonEnv,
});

const ec2service = new EcsServiceWithAlbStack(app, 'EcsLbExpEc2ServiceStack', {
  env: commonEnv,
  cluster: clusterStack.cluster,
  taskDefinition: taskdefStack.taskdef,
  launchType: LaunchType.EC2,
  serviceName: 'EcsLbExpService',
  loadBalancerName: 'EcsExpEc2LoadBalancer',
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fargateService = new EcsServiceWithAlbStack(
  app,
  'EcsLbExpFargateServiceStack',
  {
    env: commonEnv,
    cluster: clusterStack.cluster,
    taskDefinition: taskdefStack.taskdef,
    launchType: LaunchType.EC2,
    serviceName: 'EcsLbExpService',
    loadBalancerName: 'EcsExpFargateLoadBalancer',
  }
);
