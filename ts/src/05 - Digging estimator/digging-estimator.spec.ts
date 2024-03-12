import { DiggingEstimator, IVinRepository } from "./digging-estimator";

class FakeVinRepository implements IVinRepository{
    get(rockType: string): number[] {
        return [0, 3, 5.5, 7]
    }
}

class DiggingEstimatorOverload extends DiggingEstimator {
  private values = [0, 3, 5.5, 7];

  get(rockType: string): number[] {
    return this.values;
  }

  set(values: number[]) {
    this.values = values;
  }
}

describe("digging estimator", () => {

  it("should return as Dr Pockovsky said", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimatorOverload();

    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });

  it("should return as Dr Pockovsky said (interface)", () => {
    // To have it work, you need to go set the rates to [0, 3, 5.5, 7]
    const estimator = new DiggingEstimator(new FakeVinRepository());

    const result = estimator.tunnel(28, 2, "granite");

    expect(result.total).toBe(48);
  });
});
