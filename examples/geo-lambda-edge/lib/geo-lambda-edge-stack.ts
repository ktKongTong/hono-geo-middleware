import { Construct } from 'constructs'
import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class GeoLambdaEdgeStack extends cdk.Stack {
  public readonly edgeFn: lambda.Function

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)
    const edgeFn = new NodejsFunction(this, 'edgeViewer', {
      entry: 'lambda/index_edge.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
    })

    const originBucket = new s3.Bucket(this, 'originBucket')

    const IP_HEADER_NAME = 'CloudFront-Viewer-Address';

    const CITY_HEADER_NAME = 'CloudFront-Viewer-City';
    const COUNTRY_CODE_HEADER_NAME = 'CloudFront-Viewer-Country';
    const COUNTRY_NAME_HEADER_NAME = 'CloudFront-Viewer-Country-Name';
    const REGION_CODE_HEADER_NAME = 'CloudFront-Viewer-Country-Region';
    const REGION_NAME_HEADER_NAME = 'CloudFront-Viewer-Country-Region-Name';

    const LATITUDE_HEADER_NAME = 'CloudFront-Viewer-Latitude';
    const LONGITUDE_HEADER_NAME = 'CloudFront-Viewer-Longitude';
    const TIMEZONE_HEADER_NAME = 'CloudFront-Viewer-Time-Zone';

    const METRO_CODE_HEADER_NAME = 'CloudFront-Viewer-Metro-Code';
    const POSTAL_CODE_HEADER_NAME = 'CloudFront-Viewer-Postal-Code';
    const ASN_HEADER_NAME = 'CloudFront-Viewer-ASN';
    const headerReqPolicy = new cloudfront.OriginRequestPolicy(this, 'OriginRequestPolicy', {
        originRequestPolicyName: 'OriginRequestPolicy',
        comment: 'A default policy',
        headerBehavior: cloudfront.OriginRequestHeaderBehavior.all(
          IP_HEADER_NAME,
          CITY_HEADER_NAME,
          COUNTRY_CODE_HEADER_NAME,
          COUNTRY_NAME_HEADER_NAME,
          REGION_CODE_HEADER_NAME,
          REGION_NAME_HEADER_NAME,
          LATITUDE_HEADER_NAME,
          LONGITUDE_HEADER_NAME,
          TIMEZONE_HEADER_NAME,
          METRO_CODE_HEADER_NAME,
          POSTAL_CODE_HEADER_NAME,
          ASN_HEADER_NAME
        ),
    })


    new cloudfront.Distribution(this, 'Cdn', {
      defaultBehavior: {
        origin: new origins.S3StaticWebsiteOrigin(originBucket),
        edgeLambdas: [
          {
            functionVersion: edgeFn.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
          },
          ],
        originRequestPolicy: headerReqPolicy,
      },
    })
  }
}
