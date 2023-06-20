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
      camera, scene, controls, renderer
    } = map;


    // 场景初始化
    class InitScene {
      name = 'initScene';
      mounted() {
        // 脚本
        runScene.script.playAll();
        // 入场动画
        runScene.cameraEx.setTemp('初始', { time: 2 });
      }
    }


    // 添加点位
    class Point {
      name = 'initScene';

      mounted() {
        this.addSprite()
      }
      addSprite() {
        this.pointModel = getModel('点位')
        let dom = document.querySelector(`.point`)
        const sprite = Utils.domTo3DSprite(dom)
        sprite.scale.set(20, 20, 20)
        this.pointModel.add(sprite)
      }
    }

    // 基本事件
    class Events {
      name = 'events'
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

    return [Events, InitScene, Point];
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
}
export { fn };
