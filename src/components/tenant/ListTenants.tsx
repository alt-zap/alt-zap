import React, { FC, Fragment, useState, useEffect } from "react"
import { Button, List } from "antd"
import { PlusOutlined } from "@ant-design/icons"

import { Link, useNavigate } from "@reach/router"

import * as firebase from "firebase/app"
import "firebase/firestore"

import { useAuth } from "../../contexts/AuthContext"

const ListTenants: FC = () => {
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
    const db = firebase.firestore()
    const query = db
      .collection("tenants")
      .where("userId", "==", user.uid)
      .get()

    query.then(({ docs }) => {
      setTenants(docs.map(doc => ({ ...doc.data(), id: doc.id })))
      setLoading(false)
    })
  }, [user])

  return (
    <Fragment>
      {user && (
        <div className="flex flex-column items-center">
          <h1>{`Olá, ${user.displayName}`}</h1>
          <div className="flex br2 mt2 flex-column items-center bg-light-gray pa3 w-90">
            <h4>Lista de negócios</h4>
            <List
              loading={loading}
              itemLayout="horizontal"
              dataSource={tenants}
              renderItem={({ name, id }) => (
                <List.Item actions={[<Link to={`/tenant/${id}`}>editar</Link>]}>
                  {name}
                </List.Item>
              )}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/onboard")}
            >
              Adicionar
            </Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ListTenants