import { Construct } from 'constructs';
import {
  Compatibility,
  TaskDefinition,
  TaskDefinitionProps,
} from 'aws-cdk-lib/aws-ecs';
import { Role } from 'aws-cdk-lib/aws-iam';

export class TaskDefinitionWithDefaults extends TaskDefinition {
  constructor(
    scope: Construct,
    id: string,
    props: Partial<TaskDefinitionProps>
  ) {
    super(
      scope,
      id,
      Object.assign<
        Record<string, unknown>,
        TaskDefinitionProps,
        Partial<TaskDefinitionProps>
      >(
        {},
        {
          compatibility: Compatibility.EC2,
          executionRole: Role.fromRoleName(
            scope,
            `${props.family || id}TaskExecutionRole`,
            'ecsTaskExecutionRole'
          ),
          cpu: '256',
          memoryMiB: '512',
        },
        props
      )
    );
  }
}
