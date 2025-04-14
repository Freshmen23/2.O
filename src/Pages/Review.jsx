import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "../utils/firebase";
import { collection, addDoc, getDocs, doc, runTransaction } from "firebase/firestore";

const generateFacultyId = (name) => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const sanitizedName = name.trim().replace(/\s+/g, '-').toLowerCase();
  return `${sanitizedName}-${randomNum}`;
};

export default function ReviewPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [evaluation, setEvaluation] = useState("");
    const [behaviour, setBehaviour] = useState("");
    const [internals, setInternals] = useState("");
    const [average, setAverage] = useState("");
    const [teaching, setTeaching] = useState("");
    const [faculties, setFaculties] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showNewFacultyOption, setShowNewFacultyOption] = useState(false);

    useEffect(() => {
        const loadFaculties = async () => {
            const querySnapshot = await getDocs(collection(db, 'faculties'));
            setFaculties(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        };
        loadFaculties();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setIsDropdownOpen(true);
        
        // Check if search query matches any existing faculty
        const exists = faculties.some(f => 
            f.name.toLowerCase().trim() === value.toLowerCase().trim()
        );
        setShowNewFacultyOption(!exists && value.trim() !== "");
    };

    const handleSubmit = async () => {
        if (!teaching || !evaluation || !behaviour || !internals) {
            alert("Please fill all rating fields");
            return;
        }

        setIsSubmitting(true);
        try {
            let facultyId = selectedFacultyId;
            let facultyName = searchQuery.trim();

            // Create new faculty if needed
            if (!selectedFacultyId && facultyName) {
                facultyId = generateFacultyId(facultyName);
                await runTransaction(db, async (transaction) => {
                    const facultyRef = doc(db, "faculties", facultyId);
                    const facultyDoc = await transaction.get(facultyRef);
                    
                    if (!facultyDoc.exists()) {
                        transaction.set(facultyRef, {
                            name: facultyName,
                            reviewCount: 0,
                            overall: 0,
                            lastUpdated: new Date(),
                            created_at: new Date()
                        });
                    }
                });
            }

            // Calculate weighted average
            const weights = { teaching: 0.35, evaluation: 0.35, behaviour: 0.10, internals: 0.20 };
            const overall = (
                (parseFloat(teaching) * weights.teaching +
                parseFloat(evaluation) * weights.evaluation +
                parseFloat(behaviour) * weights.behaviour +
                parseFloat(internals) * weights.internals
            ).toFixed(1));

            // Add review and update faculty stats
            await runTransaction(db, async (transaction) => {
                const facultyRef = doc(db, "faculties", facultyId);
                const facultyDoc = await transaction.get(facultyRef);

                if (!facultyDoc.exists()) throw new Error("Faculty not found");

                // Add new review
                const reviewsRef = collection(facultyRef, "reviews");
                const newReviewRef = doc(reviewsRef);
                transaction.set(newReviewRef, {
                    teaching: parseFloat(teaching),
                    evaluation: parseFloat(evaluation),
                    behaviour: parseFloat(behaviour),
                    internals: parseFloat(internals),
                    overall: parseFloat(overall),
                    timestamp: new Date()
                });

                // Update faculty stats
                const currentData = facultyDoc.data();
                const newCount = currentData.reviewCount + 1;
                const newAverage = currentData.overall 
                    ? ((currentData.overall * currentData.reviewCount) + parseFloat(overall)) / newCount
                    : parseFloat(overall);

                transaction.update(facultyRef, {
                    reviewCount: newCount,
                    overall: newAverage,
                    lastUpdated: new Date()
                });
            });

            alert("Review submitted successfully!");
            // Reset form
            setTeaching("");
            setEvaluation("");
            setBehaviour("");
            setInternals("");
            // Refresh faculty list
            const querySnapshot = await getDocs(collection(db, 'faculties'));
            setFaculties(querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })));
        } catch (error) {
            console.error("Submission error:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
            setIsDropdownOpen(false);
            setShowNewFacultyOption(false);
        }
    };

    return (
        <div className="p-6 space-y-4 max-w-md mx-auto">
            <h2 className="text-xl font-semibold">Review Page</h2>

            <div className="relative">
                <Input
                    placeholder="Search faculty"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    disabled={isSubmitting}
                />

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border rounded shadow-lg z-10 mt-1 max-h-60 overflow-auto">
                        {faculties
                            .filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((faculty) => (
                                <div
                                    key={faculty.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedFacultyId(faculty.id);
                                        setSearchQuery(faculty.name);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {faculty.name}
                                </div>
                            ))}
                        
                        {showNewFacultyOption && (
                            <div
                                className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600"
                                onClick={() => {
                                    setSelectedFacultyId("");
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Add New Professor: "{searchQuery}"
                            </div>
                        )}
                    </div>
                )}
            </div>

            {(selectedFacultyId || showNewFacultyOption) && (
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Repeat similar blocks for Evaluation, Behaviour, and Internals */}

                        <Button 
                            className="w-full" 
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}