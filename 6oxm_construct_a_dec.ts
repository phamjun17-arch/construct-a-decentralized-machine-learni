interface IData {
  id: string;
  label: string;
  data: number[];
  userId: string;
}

interface IModel {
  id: string;
  name: string;
  description: string;
  architecture: string;
  weights: string[];
}

interface INode {
  id: string;
  userId: string;
  modelId: string;
  data: IData[];
  aggregatedWeights: string[];
}

interface IDashboard {
  nodes: INode[];
  models: IModel[];
  userId: string;
}

class DecentralizedMachineLearningModelDashboard {
  private dashboard: IDashboard;

  constructor(userId: string) {
    this.dashboard = {
      nodes: [],
      models: [],
      userId,
    };
  }

  addNode(modelId: string, data: IData[]): void {
    const node: INode = {
      id: `${this.dashboard.userId}-${Date.now()}`,
      userId: this.dashboard.userId,
      modelId,
      data,
      aggregatedWeights: [],
    };
    this.dashboard.nodes.push(node);
  }

  addModel(model: IModel): void {
    this.dashboard.models.push(model);
  }

  aggregateWeights(nodeId: string): void {
    const node = this.dashboard.nodes.find((node) => node.id === nodeId);
    if (node) {
      const model = this.dashboard.models.find((model) => model.id === node.modelId);
      if (model) {
        node.aggregatedWeights = model.weights;
      }
    }
  }

  getDashboard(): IDashboard {
    return this.dashboard;
  }
}

export { DecentralizedMachineLearningModelDashboard };