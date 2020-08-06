import React, { FC, useState, useCallback, useMemo } from 'react'
import {
  Button,
  Form,
  Divider,
  Select,
  TimePicker,
  Skeleton,
  message,
} from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import moment, { Moment } from 'moment'

import {
  useAltIntl,
  Message,
  IntlSelect,
  prepareSelect,
} from '../../intlConfig'
import {
  useTenantConfig,
  useTenantDispatch,
  setOpeningHours,
} from '../../contexts/TenantContext'
import { Days } from '../../typings'

const { Item } = Form
const { Option } = Select
const { RangePicker } = TimePicker

const dayOptions: IntlSelect = [
  {
    value: 'ALL',
    name: 'tenant.days.all',
  },
  {
    value: 'WEEKDAYS',
    name: 'tenant.days.weekdays',
  },
  {
    value: 'WEEKEND',
    name: 'tenant.days.weekend',
  },
  {
    value: 'MONDAY',
    name: 'tenant.days.monday',
  },
  {
    value: 'TUESDAY',
    name: 'tenant.days.tuesday',
  },
  {
    value: 'WEDNESDAY',
    name: 'tenant.days.wednesday',
  },
  {
    value: 'THURSDAY',
    name: 'tenant.days.thursday',
  },
  {
    value: 'FRIDAY',
    name: 'tenant.days.friday',
  },
  {
    value: 'SATURDAY',
    name: 'tenant.days.saturday',
  },
  {
    value: 'SUNDAY',
    name: 'tenant.days.sunday',
  },
]

// TODO: Make this works because the current UX sucks
// const RangePickerAuto = (
//   props: React.ComponentPropsWithoutRef<typeof RangePicker>
// ) => {
//   const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
//     console.log(elem.target.value)
//     const value = moment(elem.target.value, props.format)

//     if (value?.isValid() && props.onChange) {
//       props.onChange(value, elem.target.value)
//     }
//   }

//   return <RangePicker {...props} onBlur={onBlur} />
// }

type RawOpeningHours = {
  intervals: Array<{
    days: Days
    time: Moment[]
  }>
}

const OpeningHours: FC = () => {
  const intl = useAltIntl()
  const [loading, setLoading] = useState(false)

  const { tenant, loading: tenantLoading, tenantId } = useTenantConfig()
  const dispatch = useTenantDispatch()

  const rawInitialValues = useMemo(() => {
    if (!tenant?.openingHours) return {}

    const { intervals } = tenant.openingHours

    const momentIntervals = intervals.map(({ from, to, days }) => {
      return {
        days,
        time: [moment(from), moment(to)],
      }
    })

    return {
      intervals: momentIntervals,
    }
  }, [tenant])

  const handleSaveOpeningHours = useCallback(
    (data: RawOpeningHours) => {
      setLoading(true)

      // TODO: Validate Time Range
      const mappedIntervals = data.intervals.map(({ days, time }) => {
        const [from, to] = time.map((mom) => mom.toISOString())

        return {
          days,
          from,
          to,
        }
      })

      const openingHours = {
        intervals: mappedIntervals,
      }

      setOpeningHours(dispatch, { openingHours, tenantId })
        .then(() => {
          message.success('Dados atualizados com sucesso')
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [dispatch, tenantId]
  )

  return (
    <div className="w-90 w-50-l bg-white ph3 pt1 pb2 ml0 ml4-l mt2 br1">
      <Divider>
        <Message id="tenant.hours.weekTitle" />
      </Divider>
      {tenantLoading ? (
        <Skeleton active />
      ) : (
        <Form
          initialValues={rawInitialValues}
          layout="vertical"
          onFinish={(data) => {
            handleSaveOpeningHours(data as RawOpeningHours)
          }}
        >
          <Form.List name="intervals">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex flex-wrap flex-nowrap-l justify-center items-center b--black-20 b--solid pa2 pt3 mt3"
                    style={{ borderWidth: '1px' }}
                  >
                    <div className="pv2-2 pv0 pr2 w-100 w-40-l">
                      <Item
                        {...field}
                        className="w-100"
                        name={[field.name, 'days']}
                        fieldKey={[field.fieldKey, 'days']}
                        label={<Message id="tenant.hours.day" />}
                        rules={[{ required: true }]}
                      >
                        <Select
                          size="large"
                          placeholder={
                            <Message id="tenant.hours.dayPlaceholder" />
                          }
                        >
                          {prepareSelect(dayOptions, intl).map(
                            ({ value, name }) => (
                              <Option value={value} key={value}>
                                {name}
                              </Option>
                            )
                          )}
                        </Select>
                      </Item>
                    </div>
                    <div className="w-100 w-auto-l flex justify-between items-center">
                      <Item
                        {...field}
                        name={[field.name, 'time']}
                        fieldKey={[field.fieldKey, 'time']}
                        label={<Message id="tenant.hours.hourInterval" />}
                        rules={[{ required: true }]}
                      >
                        <RangePicker
                          picker="time"
                          size="large"
                          format="HH:mm"
                          minuteStep={15}
                        />
                      </Item>
                      <MinusCircleOutlined
                        className="pa3"
                        alt={intl.formatMessage({ id: 'tenant.hours.remove' })}
                        onClick={() => {
                          remove(field.name)
                        }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt3">
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add()
                      }}
                      block
                    >
                      <PlusOutlined /> <Message id="tenant.hours.addInterval" />
                    </Button>
                  </Form.Item>
                </div>
              </div>
            )}
          </Form.List>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
              block
            >
              <Message id="save" />
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default OpeningHours
