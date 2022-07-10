import { Component } from "@angular/core";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    /**
     * The shown sections
     */
    private sections = ["about", "youtube", "clothes", "gallery", "others"];
    /**
     * The timeout reference for the scroll snapping
     */
    private scrollTimeout = NaN;

    /**
     * Constructor
     */
    constructor() {
        document.addEventListener("scroll", () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(this.scrollToSection, 1000);
        });
    }

    /**
     * Scroll into a section
     */
    public scrollTo(section: string): void {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /**
     * Try to scroll to the nearest section
     */
    private scrollToSection = () => {
        for (const sectionId of this.sections) {
            const section = document.getElementById(sectionId) as HTMLElement;
            const relativePosition = section.offsetTop - document.documentElement.scrollTop;
            if (Math.abs(relativePosition) < 200) this.scrollTo(sectionId);
        }
    };
}
