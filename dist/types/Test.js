export function getTest(test) {
    // @ts-ignore
    return test.tests ? undefined : test;
}
export function getTestGroup(test) {
    // @ts-ignore
    return test.tests ? test : undefined;
}
