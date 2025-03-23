export function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(instance);
      } else if (typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<T | null>).current = instance;
      }
    });
  };
}
