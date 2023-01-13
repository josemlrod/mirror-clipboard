import type { Dispatch, SetStateAction } from "react";

export function addDropdownWindowClickListener(
  setShowDropdown: Dispatch<SetStateAction<boolean>>
) {
  if (typeof document === "undefined") {
    return;
  }

  window.onclick = function (event: MouseEvent) {
    const element = event.target as HTMLButtonElement;
    if (!element.matches(".dropbtn")) {
      const dropdowns = document.querySelectorAll("#dropdown_content");
      dropdowns.forEach((dropdown) => {
        if (dropdown.classList.contains("hidden")) {
          return;
        }

        dropdown.classList.add("hidden");
        setShowDropdown(false);
      });
    }
  };
}
