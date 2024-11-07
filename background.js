
if (typeof browser == "undefined") {
    // `browser` is not defined in Chrome, but Manifest V3 extensions in Chrome
    // also support promises in the `chrome` namespace, like Firefox. To easily
    // test the example without modifications, polyfill "browser" to "chrome".
    globalThis.browser = chrome;
}

function generateCookieString() {
    function dec2hex (dec) {
        return dec.toString(16).padStart(2, "0")
    }
    function randStr(len) {
        const arr = new Uint8Array((len || 40) / 2);
        crypto.getRandomValues(arr);
        return Array.from(arr, dec2hex).join('');
    }

    let ret = "";
    for (let i = 0; i < 10; i++) {
        ret += "; weDontWantUrCookies" + i + '=' + randStr(300);
    }
    return ret;
}

// More private to generate it randomly every time even tho bigger perf hit
// const cookieString = '; weDontWantUrCookies0=58ec4f2e3'
//     + '050688c699b34d8d3b3fa7cde92497cf07ed5bb63174735f805e048959364e6390de1f9d9bdfa278e8ff891c54b34f0c1ff5f725d5f495b47a3872502f6554b9331823ad1799d4a5c9da605f2d86021b08f46d4a267b4096feb80fd240b557a7c81964c63402abcc7046139d2694f91e9d37080c4db533'
//     + 'd2d9ad641b1eb435a10b440dfb0cebeb18391034e86dfed83af57; weDontWantUrCookies1=53fedb32fd70f7a6abd07bec08451bf8d033156a67c4fd888986cb2dd40c8601d2d87d87bfc1699c872e31b295f49b23da5242b2b5c3b2196a077f4cf36e27e8c1a0f64d77c3fb52def04f3eabe0452dca'
//     + '4fc208a95717ca96792d44f80006221d1429e982abd16193e0f8303bca5d2497fa444b2a63441cb89fe8d14f85aafce9c80032c47e3a7e99e0cc382c3508890a2f63529376; weDontWantUrCookies2=54481633642cc8aa9b6119898907029913513f76bab172ea877e52eec4568fc4411cfffca63d9'
//     + 'fe524241ab5613059ccb2c4e82425f7adce6419d7a8526e088b6594d69ce32233bc6f155d017ff4b51fc6fca8edcdd1df95b7b8c5f4a11cd7473dbd61b439b133be71db6709f312eb7496807e6a3486392c1f2949aa2c6ad87c887b1e01b02bec0cf1b34557205a143ce7f47f010dac; weDontWantUrC'
//     + 'ookies3=81dd049de48c5ea4756034c220a315add3ee60aa10071a66e5ba0215f9af031f638ffc4b0ae149a4101bf83f7c5ad4cb94e8a708e141f4ca530ade246eae79fa0c6e623d8ee2a0c54d7454fbcbb0dba7e0ad4d465a9d21b1bd2956b7ede910e435cffed2d1fe82c0998df2647ce649c4e426b9'
//     + '48d32a4bc690d76e348f4e4b8a4b245dc42c5b2a2160414f968c01c3719b3e51d54dda; weDontWantUrCookies4=9d50b7af738c79b6c36bcc64b52d5bb75d5c1c12669ec885d92be524d5436b3b8b1230123b638e5b1fbf89674d8604667cf494893184061fdc5abe4f2e1ca421e847d3c1e42058e38'
//     + '781077e0e66566b8c2adb16f6e97714d91ce476b2326dde1997d3424893b28ea1f62a4067522d86d0844a8d033406acf9f8f276fd6e2d29fa4e1aa0bb191cfd867a437ab42c79e29d4fedc9c3b6; weDontWantUrCookies5=c75916edb5865578cfcefdd4846be346672aeb2b3c8ae313d89b5fb1c5e2'
//     + '26e82d4832fd5da86718790f20c6dc5b8b6ea5a03bf0b9b9966731d0c5e764074ea3a0b975d5e2877f722bc3c776598a40b97726c8f206968024f2fc8cdbf3b85f44ad7ef65734d8270f9f5bb380c44f7aa39ccf7356e073284f6d9ed1d778d1fecaece5e22fe4351bed143d34819b9bfc213cb3f7cd0a'
//     + '3b; weDontWantUrCookies6=ca5e34cde0751c9333eb2c4e4e1d16d91ecf3e917edf160008f3f176733796992a3b7d8433aeeb32102ece8fc83ac02a6d5971217852d730a9322e03f74bc3d1297b1e8df1dfbf64490847c71ee42279f92e777ca8d247e573913caaa9336978251e01a8326ddb290bd52'
//     + '8179add134951d7a58ebb1e43fb12156dcadb3de86fafc8496df8ca19cd5cea95415b789acd213eb7af80da; weDontWantUrCookies7=3dc50675b0fb0065b66165fa8621402610ccf851a42e9cfc47e46c5e76ef020201f9e1cdd2fc994888bf94001cd8f0e0c44b78031cdf514a0dc7e172e63221bf'
//     + '2d8c0126d87d04455aebcbf2b1884f6b859cc16c0052cb3da84f3a475d392c79b5b050adc265415a0bc6429c5bc3766add9c109ef3121243e232dc062ecc1eea87ab2042881e002b62b8c24bcef6e91ed856ecd1a744; weDontWantUrCookies8=348a52e1b0215e31f8c5d4407d152be7ceb622c43d3'
//     + '06bce7bdd7def179e7e26301a7c753222ef5e39ba9ad8cd787b443c6e263e8705150b0cb2f0f6473d61d459cad948ec1d938f6b72c6bc91dea9d7d0246d70fc1ea3fb70bbab4df8c7516362f74746fd3f33507f45c54a71d3d635b81aa06b74ed5ac966ca40f79fd9fe06ebd8b15df7404e4993269c72e'
//     + 'ac82def9d98f93e61ea; weDontWantUrCookies9=48b0c97a54e0aa3c34ceebb213d5177be343e96b95fdbfb0c91625c70ecfef957db7ffed6d5f9c28c9644e3891e6eec69b568cb0110a643daf11d94bbab9c8d80c6c36fae70e0efdc8ffb99ee8248069b77668ae170473b15d030008a7f1d55f6591'
//     + '611a3fe4209e13900c91f57f3783f4891b18c278c40f95c0b7a0d6534116a10ffc796023d1a1fedd5a6ecb6894b706d49e8eba1c';

/*
add our cookies
*/
function addCookies(e) {
    // browser.cookies.set({
    //     url: e.url,
    //     name: "test1",
    //     value: "hello",
    //     domain: new URL(e.url).hostname,
    //     path: "/"
    // });

    for (let header of e.requestHeaders) {
        if (header.name.toLowerCase() == 'cookie') {
            if (header.value < 25) {
                break;
            }
            // console.log('cookies: ', header.value);
            header.value += generateCookieString();
            // console.log('cookies2:', header);
            break;
        }
    }
    return { requestHeaders: e.requestHeaders };
}

/*
Add addCookies as a listener to onBeforeSendHeaders

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(addCookies,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);

