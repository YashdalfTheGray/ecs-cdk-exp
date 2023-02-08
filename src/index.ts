import 'source-map-support/register';

import * as dotenv from 'dotenv';
import { App } from 'aws-cdk-lib';

import { EcsClusterWithCapacityStack } from './stacks';

dotenv.config();

const app = new App();
new EcsClusterWithCapacityStack(app, 'EcsLbExpStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
