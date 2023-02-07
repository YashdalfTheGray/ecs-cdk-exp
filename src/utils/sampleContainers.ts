import {
  ContainerDefinitionOptions,
  ContainerImage,
  LogDrivers,
  Protocol,
} from 'aws-cdk-lib/aws-ecs';
import { ILogGroup } from 'aws-cdk-lib/aws-logs';

export function getNginxContainer(
  logGroup: ILogGroup
): ContainerDefinitionOptions {
  return {
    image: ContainerImage.fromRegistry('nginx'),
    portMappings: [{ containerPort: 80, hostPort: 80, protocol: Protocol.TCP }],
    logging: LogDrivers.awsLogs({
      logGroup,
      streamPrefix: 'containers/',
    }),
    containerName: 'nginx-container',
    memoryReservationMiB: 512,
  };
}