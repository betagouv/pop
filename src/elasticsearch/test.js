const Listr = require("listr");
const UpdaterRenderer = require("listr-update-renderer");
const Observable = require("rxjs").Observable;

const tasks = new Listr(
  [
    {
      title: "task",
      task: async () => {
        return new Observable(observer => {
          console.log("task - init");
          observer.next("Foo");

          setTimeout(() => {
            console.log("task - TIMEOUT 2000");
            observer.next("Bar");
          }, 2000);

          setTimeout(() => {
            console.log("task - TIMEOUT 2000");
            observer.complete();
          }, 4000);
        });
      }
    }
  ],
  {
    renderer: UpdaterRenderer,
    collapse: false
  }
);
tasks.run();
