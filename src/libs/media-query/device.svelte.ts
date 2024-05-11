const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
const tabletMediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

let isMobile = $state(mobileMediaQuery.matches);
let isTablet = $state(tabletMediaQuery.matches);
let isDesktop = $state(desktopMediaQuery.matches);

mobileMediaQuery.onchange = (e) => (isMobile = e.matches);
tabletMediaQuery.onchange = (e) => (isTablet = e.matches);
desktopMediaQuery.onchange = (e) => (isDesktop = e.matches);

export const device = {
    get mobile() {
        return isMobile;
    },
    get tablet() {
        return isTablet;
    },
    get desktop() {
        return isDesktop;
    },
} as const;
