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
        runScene.cameraEx.setTemp("初始", { time: 2 });
      }
    }

    // 添加点位
    class Point {
      name = "initScene";
      pointMap = {
        固德威数字孪生: "goodwe",
        中环领先数字孪生平台: "zhonghuan",
        海基智慧工厂: "haiji",
        征图智慧园区: "zhengtu",
        天鹏电站管控平台: "tianpeng",
        彧寰智慧工厂: "yuhuan",
        经开百景图: "jingkaibaijingtu",
        零探: "lingtan",
        浪潮智慧园区: "langchao",
        经开新时代大脑: "jingkaishidaidanao",
        远景能源: "yuanjing",
        市政新能源: "shizhen",
        萨科特新能源: "saketie",
        碧桂园智慧楼宇: "biguiyuan",
        华伟液压智慧工厂: "huawei",
        大航有能智慧车间: "dahang",
      };
      mounted() {
        this.addSprite();
      }

      addSprite() {
        let a = [];
        this.pointModel = getModel("点位");
        this.pointModel?.children.map((model) => {
          const name = model.name;
          const elName = this.pointMap[name];
          let dom = document.querySelector(`.spirte-${elName}`);
          const sprite = Utils.domTo3DSprite(dom);
          sprite.scale.set(0.8, 0.8, 0.8);
          model.add(sprite);
        });
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
};
export { fn };
