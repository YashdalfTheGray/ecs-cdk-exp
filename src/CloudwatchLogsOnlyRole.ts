import { Construct } from 'constructs';
import {
  Policy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';

export default class CloudwatchLogsOnlyRole extends Role {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      roleName: 'cloudwatchLogsOnlyInstanceRole',
    });

    const logsWritePolicy = new PolicyDocument({
      statements: [
        new PolicyStatement({
          resources: ['*'],
          actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
        }),
      ],
    });

    this.attachInlinePolicy(
      new Policy(scope, 'CloudWatchWriteLogsOnlyPolicy', {
        policyName: 'logsWritePolicy',
        document: logsWritePolicy,
      })
    );
  }
}