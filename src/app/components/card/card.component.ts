import { KeyValue } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexPlotOptions,
  ApexNoData,
  ApexTitleSubtitle,
  ApexStroke,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  noData: ApexNoData;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  fill: ApexFill;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: "app-component-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() exerciseName: string = "";
  @Input() chartData!: KeyValue<string, any>;

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  constructor() {}

  ngOnInit(): void {
    let series: any[] = [];
    let sortedData: Map<string, any> = this.sortData(this.chartData);

    series = this.setDiagramData(sortedData);
    this.initChartOptions(sortedData);
    this.updateChartData(series);
  }

  setDiagramData(sortedData: Map<string, any>): any[] {
    let setCounter: number = 1;
    let repsInSets: number[][];
    let series: any[] = [];

    repsInSets = this.transformInputData(sortedData);

    repsInSets.forEach((set) => {
      series.push({
        name: "Set " + setCounter++,
        data: set,
      });
    });

    return series;
  }

  transformInputData(sortedData: Map<string, any>): number[][] {
    let repsInDates: number[][] = [],
      repsInSets: number[][] = [];

    repsInSets = this.extractRepsInSetsFromInputData(sortedData);
    repsInDates = this.transposeArrayAntiDiagonal(repsInSets);

    return repsInDates;
  }

  updateChartData(series: any[]) {
    this.chartOptions.series = series;
  }

  exractDatesFromInputData(sortedData: Map<string, any>): string[] {
    let output: string[] = [],
      dates: string[] = Array.from(sortedData.keys());

    for (let i = 0; i < dates.length; i++) {
      output[i] = new Date(dates[i]).toLocaleDateString();
    }

    return output;
  }

  extractRepsInSetsFromInputData(sortedData: Map<string, any>): number[][] {
    return Array.from(sortedData.values());
  }

  transposeArrayAntiDiagonal(a: number[][]): number[][] {
    let output: number[][] = [],
      copy: number[][] = [...a];
    //https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript

    // copy.reverse(); - for diagonal transpose
    output = copy[0].map((_, colIndex) => copy.map((row) => row[colIndex]));
    return output;
  }

  initChartOptions(sortedData: Map<string, any>): void {
    this.chartOptions = {
      series: [],
      noData: {
        text: "Loading...",
      },
      chart: {
        type: "line",
        height: 350,
        stacked: true,
        stackType: "normal",
      },
      title: {
        text: "Repetitions in sets",
        align: "left",
      },
      stroke: {
        width: 5,
        curve: "smooth",
        dashArray: [0, 0, 0, 0, 0],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      xaxis: {
        categories: this.exractDatesFromInputData(sortedData),
      },
      fill: {
        opacity: 1,
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
        },
      },
    };
  }

  sortData(chartData: KeyValue<string, any>): Map<string, any> {
    var mapAsc = new Map([...Object.entries(chartData)].sort());
    return mapAsc;
  }
}
