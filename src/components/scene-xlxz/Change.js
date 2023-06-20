// const console = {
//   log: () => { }
// }

const fn = (runScene, inputData = {}, constant = {}) => {
  const fn = (map) => {
    const {
      runScene,
      Utils,
      core,
      getModel,
      constant,
      bus,
      Three,
      camera,
      scene,
      controls,
      renderer,
    } = map;

    // 场景初始化
    class InitScene {
      name = "initScene";
      mounted() {
        // 脚本
        runScene.script.playAll();

        // 入场动画
        // runScene.cameraEx.setTemp('初始', { time: 2 });

        const ps = [
          { x: -234.5286, y: 0, z: -572.3755 },
          { x: 2137.4901, y: 0, z: -572.3755 },
          { x: -234.5286, y: 0, z: 565.9378 },
          { x: 2137.4901, y: 0, z: 565.9378 },
        ];
        /**
         * 中心点 x+x/2 y+y/2
         * 
         */

        // 添加盒子
        this.addBox(ps);
      }
      // 添加 box
      addBox(ps) {
        const long = Math.abs(ps[0].x) + Math.abs(ps[1].x);

        const wide = Math.abs(ps[2].z) + Math.abs(ps[3].z);

        console.log('long:', long, wide);

      }
    }

    // 基本事件
    class Events {
      name = "events";
      constructor() {
        runScene.cb.model.setSelect.add(
          "trigger-click",
          this.triggerClick.bind(this)
        );
      }
      triggerClick = (model) => {
        if (!model) return;
        bus.$emit("logClickModel", model);
      };

      dispose() {
        controls.removeEventListener("start", this.controlStart);
      }
    }

    return [Events, InitScene];
  };

  const modules = fn({
    runScene,
    getModel: runScene.modelEx.getModel.bind(runScene.modelEx),
    core: runScene.custom,
    ...runScene.assetsEx.get(),
    ...inputData,
    constant,
    window: null,
  });

  if (!modules) return;

  modules
    .map((TheClass) => {
      const ins = new TheClass();
      if (!ins.name) throw TypeError("代码出错");
      runScene.custom[ins.name] = ins;
      return ins;
    })
    .map((ins) => ins?.mounted?.());
};
export { fn };
