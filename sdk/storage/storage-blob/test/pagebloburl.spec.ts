import * as assert from "assert";
import * as dotenv from "dotenv";

import { Aborter } from "../src/Aborter";
import { BlobURL } from "../src/BlobURL";
import { ContainerURL } from "../src/ContainerURL";
import { PageBlobURL } from "../src/PageBlobURL";
import { PremiumPageBlobTier } from "../src/models";
import { bodyToString, getBSU } from "./utils";
import { record } from "./utils/recorder";

dotenv.config({ path: "../.env" });

describe("PageBlobURL", () => {
  const serviceURL = getBSU();
  let containerName: string;
  let containerURL: ContainerURL;
  let blobName: string;
  let blobURL: BlobURL;
  let pageBlobURL: PageBlobURL;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this);
    containerName = recorder.getUniqueName("container");
    containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    await containerURL.create(Aborter.none);
    blobName = recorder.getUniqueName("blob");
    blobURL = BlobURL.fromContainerURL(containerURL, blobName);
    pageBlobURL = PageBlobURL.fromBlobURL(blobURL);
  });

  afterEach(async () => {
    await containerURL.delete(Aborter.none);
    recorder.stop();
  });

  it("create with default parameters", async () => {
    await pageBlobURL.create(Aborter.none, 512);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("create with all parameters set", async () => {
    const options = {
      blobHTTPHeaders: {
        blobCacheControl: "blobCacheControl",
        blobContentDisposition: "blobContentDisposition",
        blobContentEncoding: "blobContentEncoding",
        blobContentLanguage: "blobContentLanguage",
        blobContentType: "blobContentType"
      },
      metadata: {
        key1: "vala",
        key2: "valb"
      }
    };
    await pageBlobURL.create(Aborter.none, 512, options);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

    const properties = await blobURL.getProperties(Aborter.none);
    assert.equal(properties.cacheControl, options.blobHTTPHeaders.blobCacheControl);
    assert.equal(properties.contentDisposition, options.blobHTTPHeaders.blobContentDisposition);
    assert.equal(properties.contentEncoding, options.blobHTTPHeaders.blobContentEncoding);
    assert.equal(properties.contentLanguage, options.blobHTTPHeaders.blobContentLanguage);
    assert.equal(properties.contentType, options.blobHTTPHeaders.blobContentType);
    assert.equal(properties.metadata!.key1, options.metadata.key1);
    assert.equal(properties.metadata!.key2, options.metadata.key2);
  });

  it("create with premium page blob tier", async () => {
    const options = { tier: PremiumPageBlobTier.P20 };

    try {
      await pageBlobURL.create(Aborter.none, 512, options);

      const result = await blobURL.download(Aborter.none, 0);
      assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));

      const properties = await blobURL.getProperties(Aborter.none);
      assert.equal(properties.accessTier, options.tier);
    } catch (err) {
      if (err.message.indexOf("AccessTierNotSupportedForBlobType") == -1) { // not found
        assert.fail("Error thrown while it's not AccessTierNotSupportedForBlobType.")
      }
    }
  });

  it("uploadPages", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.equal(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.download(Aborter.none, 0, 512);
    const page2 = await pageBlobURL.download(Aborter.none, 512, 512);

    assert.equal(await bodyToString(page1, 512), "a".repeat(512));
    assert.equal(await bodyToString(page2, 512), "b".repeat(512));
  });

  it("clearPages", async () => {
    await pageBlobURL.create(Aborter.none, 1024);
    let result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(1024), 0, 1024);
    result = await pageBlobURL.download(Aborter.none, 0, 1024);
    assert.deepStrictEqual(await bodyToString(result, 1024), "a".repeat(1024));

    await pageBlobURL.clearPages(Aborter.none, 0, 512);
    result = await pageBlobURL.download(Aborter.none, 0, 512);
    assert.deepStrictEqual(await bodyToString(result, 512), "\u0000".repeat(512));
  });

  it("getPageRanges", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(512), 512, 512);

    const page1 = await pageBlobURL.getPageRanges(Aborter.none, 0, 512);
    const page2 = await pageBlobURL.getPageRanges(Aborter.none, 512, 512);

    assert.equal(page1.pageRange![0].end, 511);
    assert.equal(page2.pageRange![0].end, 1023);
  });

  it("getPageRangesDiff", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    const result = await blobURL.download(Aborter.none, 0);
    assert.deepStrictEqual(await bodyToString(result, 1024), "\u0000".repeat(1024));

    await pageBlobURL.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024);

    const snapshotResult = await pageBlobURL.createSnapshot(Aborter.none);
    assert.ok(snapshotResult.snapshot);

    await pageBlobURL.uploadPages(Aborter.none, "a".repeat(512), 0, 512);
    await pageBlobURL.clearPages(Aborter.none, 512, 512);

    const rangesDiff = await pageBlobURL.getPageRangesDiff(
      Aborter.none,
      0,
      1024,
      snapshotResult.snapshot!
    );
    assert.equal(rangesDiff.pageRange![0].start, 0);
    assert.equal(rangesDiff.pageRange![0].end, 511);
    assert.equal(rangesDiff.clearRange![0].start, 512);
    assert.equal(rangesDiff.clearRange![0].end, 1023);
  });

  it("updateSequenceNumber", async () => {
    await pageBlobURL.create(Aborter.none, 1024);
    let propertiesResponse = await pageBlobURL.getProperties(Aborter.none);

    await pageBlobURL.updateSequenceNumber(Aborter.none, "increment");
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 1);

    await pageBlobURL.updateSequenceNumber(Aborter.none, "update", 10);
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 10);

    await pageBlobURL.updateSequenceNumber(Aborter.none, "max", 100);
    propertiesResponse = await pageBlobURL.getProperties(Aborter.none);
    assert.equal(propertiesResponse.blobSequenceNumber!, 100);
  });

  it("uploadPages with invalid CRC64 should fail", async () => {
    await pageBlobURL.create(Aborter.none, 1024);

    let exceptionCaught = false;
    try
    {
      await pageBlobURL.uploadPages(Aborter.none, "b".repeat(1024), 0, 1024, {
        transactionalContentCrc64: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      });
    } catch (err) {
      if (err instanceof Error && err.message.indexOf("Crc64Mismatch") != -1) {
        exceptionCaught = true;
      }
    }

    assert.ok(exceptionCaught);
    });
});