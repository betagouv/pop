import React, { Component } from "react";
import Link from "next/link";

class Drawer extends Component {
  render() {
    console.log(this.props.notice);
    if (!this.props.notice) {
      return <div />;
    }
    return (
      <div className="drawer">
        <div className="title">Chateau</div>
        <img src="https://s3.eu-west-3.amazonaws.com/pop-phototeque/memoire/IVN00_05630067NUCA/ivn00_05630067nuca_p.jpg" />
        <div className="description">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
          labore et dolore magnam aliquam quaerat voluptatem.
        </div>
        <div>
          <Link prefetch href="/topics">
            <a>Voir la notice complete</a>
          </Link>
        </div>
        <div>{JSON.stringify(this.props.notice)}</div>
      </div>
    );
  }
}

export default Drawer;
