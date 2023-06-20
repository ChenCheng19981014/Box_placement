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

    class Test {
      name = "test";
      isGong = true;
      fns = [
        () => {
          runScene.cameraEx.setTemp("1", { time: 2 });
        },
        () => {
          runScene.cameraEx.setTemp("2", { time: 2 });
        },
        () => {
          runScene.cameraEx.setTemp("3", { time: 2 });
        },
        () => {
          runScene.cameraEx.setTemp("4", { time: 2 });
        },
      ];
      goIndex = 0;
      cc = this.debounce(2000, () => {
        this.isGong = true;
        this.doAuto();
        console.log("2秒后回调");
      });
      mounted() {
        this.doAuto();

        // 重置
        bus.$on("ts", () => {
          // 关闭上次执行
          this.isGong = false;

          this.goIndex = 0;

          // 再次调用
          this.cc();
        });
      }

      doAuto() {
        console.log(this.isGong, "再走");

        let deep = async (fns, index = 0, done) => {
          if (!this.isGong) {
            deep && (deep = () => { });
            return;
          }

          if (!this.isGong) return;

          if (this.goIndex >= fns.length) {
            this.goIndex = 0;
            deep(this.fns);
            return
          }


          await this.setPromise(this.fns[this.goIndex], 3)();

          console.log("第几步:", this.goIndex, "是否执行:", this.isGong);

          await new Promise((res) => (this.goIndex = this.goIndex + 1) && res())

          deep(fns, this.goIndex, done);
        };

        deep(this.fns, this.goIndex, () => {
          deep(this.fns);
        });
      }

      setPromise(fn, time = 0) {
        return () => {
          return new Promise((res) => {
            setTimeout(() => {
              if (!this.isGong) return;
              fn();
              res();
            }, time * 1000);
          });
        };
      }

      debounce(delay = 300, fn) {
        let timer = null;
        return function () {
          clearTimeout(timer);
          timer = setTimeout(() => {
            fn && fn.apply(this, ...arguments);
          }, delay);
        };
      }

    }

    // 添加点位
    class Point {
      name = "initScene";

      mounted() {
        this.addSprite();
      }
      addSprite() {
        this.pointModel = getModel("点位");
        let dom = document.querySelector(`.point`);
        const sprite = Utils.domTo3DSprite(dom);
        sprite.scale.set(20, 20, 20);
        this.pointModel.add(sprite);
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

    return [Events, InitScene, Point, Test];
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
