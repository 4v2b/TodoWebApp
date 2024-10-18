import { useState, useEffect } from "react";

export default function Icon({ className, iconName, width, height, stroke = "none", color = "currentColor", onClick }) {
    const [svgContent, setSvgContent] = useState("");

    useEffect(() => {
        // Dynamically fetch the SVG file
        fetch(`${process.env.PUBLIC_URL}/resources/${iconName}.svg`)
            .then((res) => res.text())
            .then((data) => {
                // Parse the SVG content and inject size and color
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(data, "image/svg+xml");
                const svgElement = svgDoc.documentElement;

                // Set attributes for size and color
                svgElement.setAttribute("width", width);
                svgElement.setAttribute("height", height);
                svgElement.setAttribute("fill", color);
                svgElement.setAttribute("stroke", stroke);
                // Set the fill color

                setSvgContent(svgElement.outerHTML);
            })
            .catch((err) => console.error(err));
    }, [iconName, width, height, color]); // Re-fetch when iconName, size, or color changes

    return (
        <div className={className} onClick={onClick} style={{ lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: svgContent }} />
    );
}
