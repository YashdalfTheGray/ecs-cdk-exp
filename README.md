# ecs-cdk-exp

Mostly here so that I can keep track of all my cdk stuff

## Getting started

```
aws configure
npm install
npm run build
npm run cdk bootstrap -- aws://<account_id>/<preferred_region>
npm run cdk synth
npm run cdk deploy -- --all
```

NOTE - if you want to pass arguments directly to CDK, use an extra pair of dashes (`--`) to tell NPM to route those arguments to the command rather than be consumed by NPM.

## Useful commands

- `npm run build` - compile typescript
- `npm run watch` - compile typescript and watch for changes
- `npm run cdk deploy` - deploy a stack to your default AWS account/region, usually accompanied with either a stack name or `--all`
- `npm run cdk diff` - compare deployed stack with current state
- `npm run cdk synth` - emits the synthesized CloudFormation template
- `npm run cdk bootstrap` - bootstrap either a new account and region or change the account and region

## References

- https://docs.aws.amazon.com/cdk/api/v1/docs/aws-ecs-readme.html
- https://medium.com/@mpschendel/running-a-windows-ecs-cluster-with-the-aws-cdk-86913de9b2f9
