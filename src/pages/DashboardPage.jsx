import React, { useEffect, useState } from "react";
import { toyService } from "../services/toy.service";
import { Doughnut, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export function DashboardPage() {
    const [toys, setToys] = useState([]);
    const [inStockCount, setInStockCount] = useState(0);
    const [outOfStockCount, setOutOfStockCount] = useState(0);

    useEffect(() => {
        toyService.query().then((toys) => {
            setToys(toys);
            const inStock = toys.filter((toy) => toy.inStock).length;
            setInStockCount(inStock);
            setOutOfStockCount(toys.length - inStock);
        });
    }, []);

    // Calculate the label counts
    const labelCounts = toys.reduce((counts, toy) => {
        toy.labels.forEach((label) => {
            counts[label] = (counts[label] || 0) + 1;
        });
        return counts;
    }, {});

    // Create an array of label names with counts
    const labelsWithCounts = Object.keys(labelCounts).map((label) => {
        return `${label} (${labelCounts[label]})`;
    });

    const dataDoughnut = {
        labels: labelsWithCounts,
        datasets: [
            {
                label: "Toy Label Counts",
                data: Object.values(labelCounts),
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 10, 64, 1)",
                    "rgba(153, 12, 250, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const dataBar = {
        labels: ["In Stock", "Out of Stock", "All Toys"],
        datasets: [
            {
                label: "Toy Stock Overview",
                data: [inStockCount, outOfStockCount, toys.length],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (

        <>
        <h2>Toy Stock Overview</h2>
        <div className="graph-container">
            <div className="stock-info">
                <div className="stock-item">
                    <h3>In Stock</h3>
                    <p className="count">{inStockCount}</p>
                </div>
                <div className="stock-item">
                    <h3>Out of Stock</h3>
                    <p className="count">{outOfStockCount}</p>
                </div>
                <div className="stock-item">
                    <h3>All Toys</h3>
                    <p className="count">{toys.length}</p>
                </div>
            </div>
            <h4>Stock Status</h4>
            <div className="chart">
                <Bar data={dataBar} />
            </div>
            <h4>Stock by labels</h4>
            <section className="chart" style={{ maxWidth: "50vw", margin: "auto" }}>
                <Doughnut data={dataDoughnut} />
            </section>
            </div>
        </>


    );
}
