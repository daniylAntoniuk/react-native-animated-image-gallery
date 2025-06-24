var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
export function normalizeSharedElementConfig(sharedElementConfig) {
    if (typeof sharedElementConfig === "string") {
        return {
            id: sharedElementConfig,
            otherId: sharedElementConfig,
            animation: "move",
        };
    }
    else {
        const { id, otherId, animation } = sharedElementConfig, other = __rest(sharedElementConfig, ["id", "otherId", "animation"]);
        return Object.assign({ id, otherId: otherId || id, animation: animation || "move" }, other);
    }
}
export function normalizeSharedElementsConfig(sharedElementsConfig) {
    if (!sharedElementsConfig || !sharedElementsConfig.length)
        return;
    return sharedElementsConfig.map(normalizeSharedElementConfig);
}
