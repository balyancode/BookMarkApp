import React from "react";
import { Card, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";


const LinkCard = ({
  data,
  onEditClickHandler,
  deleteALink
}) => {
  return (
  
    <Card style={{backgroundColor:"#D3D3D3"}}>
      <div className="flex" style={{ justifyContent:"space-between"}}>
        <a href={data.title} style={{margin:0 , padding:0}}>{data.title}</a>
        <div>
          <Tooltip placement="top"  title="edit">
        <EditOutlined onClick={()=>onEditClickHandler(data)} style={{marginRight:15,fontSize:25,color:"green"}}/>
        </Tooltip>
        <Tooltip placement="top" title="delete">
        <DeleteOutlined onClick={()=>{deleteALink(data.id)}} style={{fontSize:25,color:"red"}}/>
        </Tooltip>
        </div> 
        </div>
    </Card>
  )}
export default LinkCard
