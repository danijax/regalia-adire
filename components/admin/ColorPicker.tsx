"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Predefined colors commonly used in Adire fashion
const PRESET_COLORS = [
    { name: "Indigo", value: "#1e3a5f", hex: "#1e3a5f" },
    { name: "White", value: "#ffffff", hex: "#ffffff" },
    { name: "Cream", value: "#fffdd0", hex: "#fffdd0" },
    { name: "Brown", value: "#8b4513", hex: "#8b4513" },
    { name: "Terracotta", value: "#e2725b", hex: "#e2725b" },
    { name: "Gold", value: "#ffd700", hex: "#ffd700" },
    { name: "Navy", value: "#000080", hex: "#000080" },
    { name: "Black", value: "#000000", hex: "#000000" },
    { name: "Burgundy", value: "#800020", hex: "#800020" },
    { name: "Olive", value: "#808000", hex: "#808000" },
    { name: "Teal", value: "#008080", hex: "#008080" },
    { name: "Coral", value: "#ff7f50", hex: "#ff7f50" },
];

interface ColorPickerProps {
    value: string[];
    onChange: (colors: string[]) => void;
    maxColors?: number;
}

export function ColorPicker({
    value = [],
    onChange,
    maxColors = 5,
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleColor = (colorName: string) => {
        if (value.includes(colorName)) {
            onChange(value.filter((c) => c !== colorName));
        } else if (value.length < maxColors) {
            onChange([...value, colorName]);
        }
    };

    const removeColor = (colorName: string) => {
        onChange(value.filter((c) => c !== colorName));
    };

    const getColorHex = (colorName: string): string => {
        const color = PRESET_COLORS.find(
            (c) => c.name.toLowerCase() === colorName.toLowerCase()
        );
        return color?.hex || "#cccccc";
    };

    return (
        <div className="space-y-3">
            {/* Selected Colors Display */}
            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((colorName) => (
                        <div
                            key={colorName}
                            className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-2 py-1"
                        >
                            <div
                                className="w-5 h-5 rounded-full border border-gray-300"
                                style={{ backgroundColor: getColorHex(colorName) }}
                            />
                            <span className="text-sm">{colorName}</span>
                            <button
                                type="button"
                                onClick={() => removeColor(colorName)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Color Picker Toggle */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full p-3 border-2 border-dashed rounded-lg text-sm text-muted-foreground",
                    "hover:border-primary hover:text-primary transition-colors",
                    isOpen && "border-primary text-primary"
                )}
            >
                {value.length === 0
                    ? "Click to select available colors"
                    : `${value.length}/${maxColors} colors selected - Click to ${isOpen ? "close" : "add more"}`}
            </button>

            {/* Color Palette */}
            {isOpen && (
                <div className="grid grid-cols-4 gap-2 p-3 border rounded-lg bg-background">
                    {PRESET_COLORS.map((color) => {
                        const isSelected = value.includes(color.name);
                        const isDisabled = !isSelected && value.length >= maxColors;

                        return (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => !isDisabled && toggleColor(color.name)}
                                disabled={isDisabled}
                                className={cn(
                                    "flex items-center gap-2 p-2 rounded-lg transition-all",
                                    "hover:bg-muted",
                                    isSelected && "ring-2 ring-primary bg-muted",
                                    isDisabled && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-6 h-6 rounded-full border",
                                        color.name === "White"
                                            ? "border-gray-300"
                                            : "border-transparent"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-xs font-medium">{color.name}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Helper text */}
            <p className="text-xs text-muted-foreground">
                Select up to {maxColors} colors that this product is available in
            </p>
        </div>
    );
}
