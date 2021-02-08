export default function applyMixins(targetClass: any, mixinClasses: any[]) {

    // Loop through mixin classes
    mixinClasses.forEach((m: any) => Object.getOwnPropertyNames(m.prototype).forEach((name: string) => {

        // Clone properties
        Object.defineProperty(targetClass.prototype, name, Object.getOwnPropertyDescriptor(m.prototype, name) as PropertyDescriptor);
    }));
}