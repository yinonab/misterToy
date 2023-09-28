import React, { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Doughnut, Bar } from "react-chartjs-2"
import Chart from "chart.js/auto"

export function DashboardPage() {
    const [toys, setToys] = useState([])
    const [inStockCount, setInStockCount] = useState(0)
    const [outOfStockCount, setOutOfStockCount] = useState(0)

    useEffect(() => {
        toyService.query().then((toys) => {
            setToys(toys)
            const inStock = toys.filter((toy) => toy.inStock).length
            setInStockCount(inStock)
            setOutOfStockCount(toys.length - inStock)
        })
    }, [])

    // Calculate the label counts
    const labelCounts = toys.reduce((counts, toy) => {
        toy.labels.forEach((label) => {
            counts[label] = (counts[label] || 0) + 1
        })
        return counts
    }, {})

    // Create an array of label names with counts
    const labelsWithCounts = Object.keys(labelCounts).map((label) => {
        return `${label} (${labelCounts[label]})`
    })

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
    }

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
    }

    return (

        <>
            <h2 className="dashboard-titles">Toy Stock Overview</h2>
            <div className="graph-container">
                <div className="stock-info">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr">
                                <td>In Stock</td>
                                <td className="count">{inStockCount}</td>
                            </tr>
                            <tr className="tr">
                                <td>Out of Stock</td>
                                <td className="count">{outOfStockCount}</td>
                            </tr>
                            <tr className="tr">
                                <td>All Toys</td>
                                <td className="count">{toys.length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4 className="dashboard-titles">Stock Status</h4>
                <div className="chart">
                    <Bar data={dataBar} />
                </div>
                <h4 className="dashboard-titles"> Stock by labels</h4>
                <section className="chart" style={{ maxWidth: "30vw", margin: "auto" }}>
                    <Doughnut data={dataDoughnut} />
                </section>
            </div>
        </>


    )
}
