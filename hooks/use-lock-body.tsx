import * as React from "react";

/**
 * Custom hook to lock the body scroll when component is mounted
 * and restore original overflow style when unmounted
 *
 * @see https://usehooks.com/useLockBodyScroll
 */
export function useLockBody(): void {
  React.useLayoutEffect(() => {
    const originalStyle: string = window.getComputedStyle(
      document.body
    ).overflow;
    document.body.style.overflow = "hidden";

    return (): void => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
}
