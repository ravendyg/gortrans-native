'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

// interface BusGroupState
// {
//   expanded: boolean;
// }
// interface BusGroupProps
// {
//   item:
//   {
//     name: string,
//     vehicles: VehicleMeta []
//   },
//   closeCb: any
// }

export class BusGroup extends React.Component {
  constructor ()
  {
    super();
    this.state = {
      expanded: true
    };
  }

  _hideList() {
    this.setState({ expanded: !this.state.expanded });
  }

  _addBus(e) {
    addBus(e, true);
    this.props.closeCb();
  }


  render()
  {
    return(
      <View>
        <Text>sdfsdf</Text>
      </View>
    );
  }
}


      // <div className='bus-selector-group'>
      //   <div className='header' onClick={this._hideList.bind(this)}>
      //     <div className='text'>{this.props.item.name}</div>
      //     <div className='arrow'>
      //       <i className={this.state.expanded ? 'fa fa-arrow-down' : 'fa fa-arrow-right'} aria-hidden="true"></i>
      //     </div>
      //   </div>
      //   {this.state.expanded
      //     ? this.props.item.vehicles.map(
      //       e =>
      //         <div
      //           key={e.code}
      //           className="item"
      //           onClick={this._addBus.bind(this, e)}
      //         >
      //           {e.title}
      //         </div>
      //     )
      //     : ''
      //   }
      // </div>