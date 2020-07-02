import React, { useState, useEffect } from "react"
import { List } from "antd"
import { Link } from "@reach/router"

import * as firebase from "firebase/app"
import "firebase/firestore"

import { useAuth } from "../contexts/AuthContext"

export default () => {
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const db = firebase.firestore()
    const query = db
      .collection("tenants")
      .where("userId", "==", user.uid)
      .get()

    query.then(({ docs }) => {
      setTenants(docs.map(doc => ({ ...doc.data(), ui: doc.id })))
      setLoading(false)
    })
  }, [user.uid])

  return (
    <div className="flex flex-column items-center">
      <h1>{`Olá, ${user.displayName}`}</h1>
      <div className="flex br2 mt2 flex-column items-center">
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={tenants}
          renderItem={({ name, id }) => (
            <List.Item actions={[<Link to={`/tenant/${id}`}>ediar</Link>]}>
              {name}
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
