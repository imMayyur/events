import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, TimelineMonth, Resize, DragAndDrop, Inject, Month } from '@syncfusion/ej2-react-schedule';
class App extends React.Component {
    generateStaticEvents(start, resCount=1, overlapCount) {
        let data = [];
        let id = 1;
        for (let i = 0; i < resCount; i++) {
            let randomCollection = [];
            let random = 0;
            for (let j = 0; j < overlapCount; j++) {
                random = Math.floor(Math.random() * (30));
                random = (random === 0) ? 1 : random;
                if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
                    randomCollection.indexOf(random - 2) !== -1) {
                    random += (Math.max.apply(null, randomCollection) + 10);
                }
                for (let k = 1; k <= 2; k++) {
                    randomCollection.push(random + k);
                }
                let startDate = new Date(start.getFullYear(), start.getMonth(), random);
                startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
                let endDate = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
                data.push({
                    Id: id,
                    Subject: 'Event #' + id,
                    StartTime: startDate,
                    EndTime: endDate,
                    IsAllDay: (id % 10) ? false : true,
                    ResourceId: i + 1
                });
                id++;
            }
        }
        data = [
          {
            Id: 1,
            Subject: 'AZ-900',
            StartTime: 'Fri May 12 2020 23:47:36 GMT+0530 (India Standard Time)',
            EndTime: 'Fri May 20 2020 23:47:36 GMT+0530 (India Standard Time)',
            IsAllDay: false,
            ResourceId: 1,
            Location: 'Bangalore',
            Description: 'Confirm',
            Color:"#00bdae",
            Status: 'Shadow'
          },
          {
            Id: 1,
            Subject: 'AZ-900',
            StartTime: new Date(),
            EndTime: 'Fri May 15 2020 23:47:36 GMT+0530 (India Standard Time)',
            IsAllDay: false,
            ResourceId: 3,
            Location: 'Bangalore',
            Description: 'Confirm',
            Color:"#00bdae",
            Status: 'Trainer',
          },
          {
            Id: 1,
            Subject: 'AZ-900',
            StartTime: 'Fri May 20 2020 23:47:36 GMT+0530 (India Standard Time)',
            EndTime: 'Fri May 22 2020 23:47:36 GMT+0530 (India Standard Time)',
            IsAllDay: false,
            ResourceId: 3,
            Location: 'Bangalore',
            Description: 'Confirm',
            Color:"#00bdae",
            Status: 'Trainer',
          }
        ]
        console.log("DATA", data)
        return data;
    }
    generateResourceData(startId, endId, text1) {
        let text = ['Mayur', 'Patel', 'Jay', 'Avinash', 'Darshan', 'Jignesh', 'Vivek', 'Avinash', 'Darshan', 'Jignesh', 'Vivek']
        let data = [];
        let colors = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c',
            '#fdd835', '#748ffc', '#9775fa', '#df5286', '#7fa900',
            '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        for (let a = 1; a <= text.length; a++) {
            let n = Math.floor(Math.random() * colors.length);
            data.push({
                Id: a,
                Text: text[a-1],
                Color: colors[n]
            });
        }
        return data;
    }
    eventTemplate(props) {
      if(props.data.Status === 'Shadow') {
        props.element.style.backgroundColor = 'green';
        props.element.style.height = '55px'
      }
    }

    resourceHeaderTemplate(props) {
      console.log("PTR", props.resourceData.Text)
      return (
        <div className="template-wrap">
          <div className="resource-detail">
            <div className="resource-name">{props.resourceData.Text}</div>
            <div className="resource-designation"></div>
          </div>
        </div>);
    }
    render() {
        return (
          <ScheduleComponent 
            cssClass='virtual-scrolling'
            ref={schedule => this.scheduleObj = schedule}
            width='100%'
            height='750px'
            selectedDate={new Date()}
            eventSettings={{
              dataSource: this.generateStaticEvents(new Date(2018, 4, 1), 300, 12),
            }}
            group={{ resources: ['Resources'] }}
            eventRendered={this.eventTemplate.bind(this)}
            resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)}
          >
          <ResourcesDirective>
            <ResourceDirective
              style={{ width: '10%'}}
              field='ResourceId'
              title='Resource'
              name='Resources' 
              dataSource={this.generateResourceData(1, 300, 'Resource')}
              idField='Id'>
            </ResourceDirective>
          </ResourcesDirective>
          <ViewsDirective>
            <ViewDirective option='TimelineMonth' allowVirtualScrolling={true}/>
          </ViewsDirective>
          <Inject services={[TimelineMonth, Resize, DragAndDrop, Month]}/>
        </ScheduleComponent>);
    }
}
//ABC
export default App
