import { Stack, App, StackProps } from 'aws-cdk-lib';
import {
  Compatibility,
  NetworkMode,
  TaskDefinition,
} from 'aws-cdk-lib/aws-ecs';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { TaskDefinitionWithDefaults } from '../constructs';

import { getNginxContainer } from '../utils';

export class TaskdefStack extends Stack {
  public logGroup: LogGroup;
  public taskdef: TaskDefinition;

  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    this.logGroup = new LogGroup(this, 'EcsExperimentsLogGroup', {
      logGroupName: `${id}LogGroup`,
      retention: RetentionDays.THREE_DAYS,
    });

    this.taskdef = new TaskDefinitionWithDefaults(
      this,
      'NginxTaskDefWithLogs',
      {
        family: 'NginxTaskdefWithLogs',
        networkMode: NetworkMode.AWS_VPC,
        compatibility: Compatibility.EC2_AND_FARGATE,
        cpu: '256',
        memoryMiB: '512',
      }
    );

    this.taskdef.addContainer(
      'NginxWebContainer',
      getNginxContainer(this.logGroup)
    );
  }
}
