import 'source-map-support/register';

import * as dotenv from 'dotenv';
import { App } from 'aws-cdk-lib';

import { EcsClusterWithCapacityStack, TaskdefStack } from './stacks';

dotenv.config();

const app = new App();

const commonEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new EcsClusterWithCapacityStack(app, 'EcsLbExpClusterStack', {
  env: commonEnv,
});

new TaskdefStack(app, 'EcsLbExpTaskdefStack', { env: commonEnv });
