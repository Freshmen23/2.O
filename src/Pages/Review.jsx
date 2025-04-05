import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialNames = ["Amitesh", "Atharva", "Satya", "Abhishek", "Prayag"];

export default function ReviewPage() {
    const [names, setNames] = useState(initialNames);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [evaluation, setEvaluation] = useState("");
    const [behaviour, setBehaviour] = useState("");
    const [internals, setInternals] = useState("");
    const [average, setAverage] = useState("");
    const [teaching, setTeaching] = useState("");

    const filteredNames = names.filter(name =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddName = () => {
        if (searchQuery.trim() && !names.includes(searchQuery)) {
            setNames([...names, searchQuery]);
            setSelectedName(searchQuery);
            setSearchQuery("");
            setIsDropdownOpen(false);
        }
    };

    const handleSelectName = (name) => {
        setSelectedName(name);
        setSearchQuery(name);
        setIsDropdownOpen(false);
    };

    const handleSubmit = () => {
        if (!selectedName || !evaluation || !behaviour || !internals) {
            alert("Please fill all fields");
            return;
        }

        const formData = {
            name: selectedName,
            evaluation: parseFloat(evaluation),
            behaviour: parseFloat(behaviour),
            internals: parseFloat(internals)
        };

        console.log("Form submitted:", formData);
        alert("Form submitted successfully!");

        setSearchQuery("");
        setSelectedName("");
        setEvaluation("");
        setBehaviour("");
        setInternals("");
    };

    return (
        <div className="p-6 space-y-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold">Review Page</h2>

            <div className="relative">
                <Input
                    placeholder="Search or select name"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                />

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10 mt-1 max-h-60 overflow-auto">
                        {filteredNames.map((name) => (
                            <div
                                key={name}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectName(name)}
                            >
                                {name}
                            </div>
                        ))}

                        {filteredNames.length === 0 && (
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={handleAddName}
                            >
                                Add "{searchQuery}"
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {selectedName && (
                <Card>
                    <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                            <label className="block font-medium">Teaching (out of 5)</label>
                            <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={teaching}
                                onChange={(e) => setTeaching(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium">Evaluation (out of 5)</label>
                            <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={evaluation}
                                onChange={(e) => setEvaluation(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium">Behaviour (out of 5)</label>
                            <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={behaviour}
                                onChange={(e) => setBehaviour(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium">Internals (out of 5)</label>
                            <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={internals}
                                onChange={(e) => setInternals(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium">Average</label>
                            <select
                                className="border border-gray-300 rounded p-2"
                                value={average}
                                onChange={(e) => setAverage(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <Button className="w-full" onClick={handleSubmit}>
                            Submit Review
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}