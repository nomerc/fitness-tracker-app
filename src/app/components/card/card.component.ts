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
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  noData: ApexNoData;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  fill: ApexFill;
  legend: ApexLegend;
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
  series: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setDiagramData();
    this.initChartOptions();
    this.updateChartData();
  }

  setDiagramData(): void {
    let setCounter: number = 1;
    let repsInSets: number[][];

    repsInSets = this.transformInputData();

    repsInSets.forEach((set) => {
      this.series.push({
        name: "Set " + setCounter++,
        data: set,
      });
    });
  }

  transformInputData(): number[][] {
    let repsInDates,
      repsInSets: number[][] = [];

    this.exractDatesFromInputData();
    repsInSets = this.extractRepsInSetsFromInputData();
    repsInDates = this.transposeArray(repsInSets);

    return repsInDates;
  }

  updateChartData() {
    this.chartOptions.series = this.series;
  }

  exractDatesFromInputData(): string[] {
    let output: string[] = [],
      dates: string[] = Object.keys(this.chartData.value);

    dates.forEach((textDate) => {
      output.unshift(new Date(textDate).toLocaleDateString());
    });

    return output;
  }

  extractRepsInSetsFromInputData(): number[][] {
    return Object.values(this.chartData.value);
  }

  transposeArray(a: number[][]): number[][] {
    let output: number[][] = [];
    //https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    a.reverse();
    output = a[0].map((_, colIndex) => a.map((row) => row[colIndex]));
    return output;
  }

  initChartOptions(): void {
    this.chartOptions = {
      series: [],
      noData: {
        text: "Loading...",
      },
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "normal",
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
        categories: this.exractDatesFromInputData(),
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50,
      },
      plotOptions: {
        bar: {
          columnWidth: "15%",
        },
      },
    };
  }
}
