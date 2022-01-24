class ATInternetService {
    constructor() {
      this.tag = this.newTag({secure: true});
    }
  
    newTag(options) {
      try {
        return new window.ATInternet.Tracker.Tag(options);
      } catch(ex) {
        return {
          dispatch: () => ({}),
          page: { set: () => ({}) }
        };
      }
    }
  
    //@param info: {name: string, level2?: string, chapter1?: string, chapter2?: string, chapter3?: string, customObject?: any}
    sendPage(info) {
      this.tag.page.set(info);
      console.log(process.env.NODE_ENV)
      this.tag.dispatch();
    }
  }
  
  export let tag = new ATInternetService();