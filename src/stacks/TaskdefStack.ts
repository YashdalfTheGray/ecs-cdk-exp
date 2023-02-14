import { Stack, App, StackProps } from 'aws-cdk-lib';
import { NetworkMode } from 'aws-cdk-lib/aws-ecs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { TaskDefinitionWithDefaults } from '../constructs';

import { getNginxContainer } from '../utils';

export class TaskdefStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, 'EcsExperimentsLogGroup', {
      logGroupName: `${id}LogGroup`,
      retention: RetentionDays.THREE_DAYS,
    });

    const nginxTaskDef = new TaskDefinitionWithDefaults(
      this,
      'NginxTaskDefWithLogs',
      { family: 'NginxTaskdefWithLogs', networkMode: NetworkMode.AWS_VPC }
    );

    nginxTaskDef.addContainer('NginxWebContainer', getNginxContainer(logGroup));
  }
}
