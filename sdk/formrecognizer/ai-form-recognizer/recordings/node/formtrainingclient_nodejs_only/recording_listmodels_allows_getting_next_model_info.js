let nock = require('nock');

module.exports.hash = "ecd06030a523dfa534b79479fcad7143";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/formrecognizer/v2.0-preview/custom/models')
  .query(true)
  .reply(200, {"modelList":[{"modelId":"022064da-8471-4092-adf1-5472ae4dc036","status":"ready","createdDateTime":"2020-04-30T22:49:37Z","lastUpdatedDateTime":"2020-04-30T22:49:40Z"},{"modelId":"025aab54-5cfe-4f4a-afc6-e5c1cd5dcb1e","status":"ready","createdDateTime":"2020-05-02T06:31:57Z","lastUpdatedDateTime":"2020-05-02T06:32:06Z"},{"modelId":"04676220-afd5-44c2-963d-954416d7fb46","status":"ready","createdDateTime":"2020-05-01T21:27:43Z","lastUpdatedDateTime":"2020-05-01T21:27:46Z"},{"modelId":"04e65746-0695-4a54-97eb-3098f0861a67","status":"ready","createdDateTime":"2020-05-01T07:06:43Z","lastUpdatedDateTime":"2020-05-01T07:06:46Z"},{"modelId":"074d2d80-5ade-4510-8daf-d2a858700819","status":"ready","createdDateTime":"2020-05-01T21:38:00Z","lastUpdatedDateTime":"2020-05-01T21:38:03Z"},{"modelId":"08b77174-09bc-494d-9d72-c4ed1271aeee","status":"invalid","createdDateTime":"2020-04-30T22:33:30Z","lastUpdatedDateTime":"2020-04-30T22:33:31Z"},{"modelId":"0bcd569d-7341-4ed7-8a6f-49f602c4c05f","status":"ready","createdDateTime":"2020-05-02T06:36:10Z","lastUpdatedDateTime":"2020-05-02T06:36:22Z"},{"modelId":"0c66d4e9-0c96-41b4-a952-79807095e846","status":"ready","createdDateTime":"2020-05-01T22:57:33Z","lastUpdatedDateTime":"2020-05-01T22:57:43Z"},{"modelId":"0ea3a5dd-3829-4931-adbc-86a1d30781c4","status":"ready","createdDateTime":"2020-05-02T06:31:36Z","lastUpdatedDateTime":"2020-05-02T06:31:44Z"},{"modelId":"11bf745f-6b09-423b-9d96-168608082dd9","status":"ready","createdDateTime":"2020-05-01T07:56:52Z","lastUpdatedDateTime":"2020-05-01T07:57:00Z"},{"modelId":"1678bd79-a465-484b-8136-11c7981b6626","status":"ready","createdDateTime":"2020-05-02T06:31:05Z","lastUpdatedDateTime":"2020-05-02T06:31:31Z"},{"modelId":"1a52d22a-1469-4a4c-bc5b-2997fc28db9c","status":"ready","createdDateTime":"2020-05-01T22:12:37Z","lastUpdatedDateTime":"2020-05-01T22:12:45Z"},{"modelId":"1f08b8cb-0564-4301-b909-f1a3de205b05","status":"ready","createdDateTime":"2020-04-23T18:37:47Z","lastUpdatedDateTime":"2020-04-23T18:37:57Z"},{"modelId":"23024eb8-2419-4a23-9899-067d5820b759","status":"ready","createdDateTime":"2020-05-01T07:21:30Z","lastUpdatedDateTime":"2020-05-01T07:21:39Z"},{"modelId":"287aaad4-d5ae-4d04-baa9-39db1404a6af","status":"ready","createdDateTime":"2020-05-01T23:59:51Z","lastUpdatedDateTime":"2020-05-01T23:59:59Z"},{"modelId":"2a9a1102-1662-4946-a71c-b8b8e897ad6c","status":"ready","createdDateTime":"2020-05-01T07:22:07Z","lastUpdatedDateTime":"2020-05-01T07:22:15Z"},{"modelId":"2baae163-e118-40f5-8676-2f72440a1c7d","status":"ready","createdDateTime":"2020-05-01T07:06:33Z","lastUpdatedDateTime":"2020-05-01T07:06:41Z"},{"modelId":"2d7f9adc-7c12-4fff-a8a9-f7a05f0f794e","status":"ready","createdDateTime":"2020-05-01T17:59:37Z","lastUpdatedDateTime":"2020-05-01T17:59:45Z"},{"modelId":"2dee13aa-3dda-4c3d-b932-67d9ea1a7200","status":"ready","createdDateTime":"2020-05-01T10:10:24Z","lastUpdatedDateTime":"2020-05-01T10:10:27Z"},{"modelId":"2f29d2b5-99fe-43ae-8afc-42e642b04055","status":"ready","createdDateTime":"2020-05-01T07:17:41Z","lastUpdatedDateTime":"2020-05-01T07:17:44Z"},{"modelId":"2f9ad812-9fc7-47dc-b062-42431a9b9295","status":"ready","createdDateTime":"2020-05-01T07:54:02Z","lastUpdatedDateTime":"2020-05-01T07:54:10Z"},{"modelId":"313d4c02-ea36-4d7c-be08-af36a218721d","status":"ready","createdDateTime":"2020-04-30T20:15:39Z","lastUpdatedDateTime":"2020-04-30T20:15:46Z"},{"modelId":"348e4616-19a1-4cd5-9ac5-9074acfdd5b7","status":"ready","createdDateTime":"2020-05-01T07:56:31Z","lastUpdatedDateTime":"2020-05-01T07:56:38Z"},{"modelId":"35b66416-d11c-4de0-ba71-4871b40381dc","status":"ready","createdDateTime":"2020-05-01T07:02:45Z","lastUpdatedDateTime":"2020-05-01T07:02:53Z"},{"modelId":"38bca5db-0442-4391-a7e2-38d37e5206af","status":"ready","createdDateTime":"2020-05-02T00:10:00Z","lastUpdatedDateTime":"2020-05-02T00:10:08Z"},{"modelId":"3d994f68-70ea-4074-a2a8-5ac8c3e01eba","status":"invalid","createdDateTime":"2020-04-30T22:33:24Z","lastUpdatedDateTime":"2020-04-30T22:33:25Z"},{"modelId":"3dba5c40-47dc-461d-97e6-b279058e840c","status":"ready","createdDateTime":"2020-05-01T07:02:29Z","lastUpdatedDateTime":"2020-05-01T07:02:32Z"},{"modelId":"3f289b6a-83cd-4e5a-ad06-6df0809e0bf6","status":"ready","createdDateTime":"2020-05-02T00:57:03Z","lastUpdatedDateTime":"2020-05-02T00:57:14Z"},{"modelId":"3f34ccc3-e3c7-4499-b71e-0d2b12fd139a","status":"ready","createdDateTime":"2020-05-01T21:32:38Z","lastUpdatedDateTime":"2020-05-01T21:32:45Z"},{"modelId":"4501b6cf-ad87-4406-83ff-068680298ed0","status":"ready","createdDateTime":"2020-05-01T22:13:54Z","lastUpdatedDateTime":"2020-05-01T22:14:01Z"},{"modelId":"462d3695-9b8a-47f6-80ac-b79615497c67","status":"ready","createdDateTime":"2020-05-01T21:32:27Z","lastUpdatedDateTime":"2020-05-01T21:32:35Z"},{"modelId":"47e34f45-745a-42d7-b82f-83a7b61d3d08","status":"ready","createdDateTime":"2020-04-23T17:14:21Z","lastUpdatedDateTime":"2020-04-23T17:14:28Z"},{"modelId":"4a3ba348-7ec7-4bc3-badd-11bef106f3df","status":"ready","createdDateTime":"2020-05-01T22:57:17Z","lastUpdatedDateTime":"2020-05-01T22:57:20Z"},{"modelId":"4d1950d3-b109-4b97-9720-cdf2ff4763e7","status":"ready","createdDateTime":"2020-05-02T06:36:26Z","lastUpdatedDateTime":"2020-05-02T06:36:39Z"}],"nextLink":"https://endpoint:443/formrecognizer/v2.0-preview/custom/models?nextLink=2!232!MDAwMTMwIXN1YnNjcmlwdGlvbnMvYWYxNzM1Y2U5ZDczNDhmNTgyYjhiNWUwMGFjMjc5NDYvbW9kZWxzLzUzYjAxNTdjLThkYmEtNDliYy05OWI1LTM2MmZkNDNmOTAwNC81M2IwMTU3Yy04ZGJhLTQ5YmMtOTliNS0zNjJmZDQzZjkwMDQuZ3ohMDAwMDI4ITk5OTktMTItMzFUMjM6NTk6NTkuOTk5OTk5OVoh"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-envoy-upstream-service-time',
  '570',
  'apim-request-id',
  '45cbcb5e-7667-4931-82a8-bc9cd047923e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 02 May 2020 20:00:37 GMT'
]);
