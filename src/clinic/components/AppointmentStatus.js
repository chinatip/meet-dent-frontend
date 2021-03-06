import React from 'react'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'

import { formatStatus } from '../util'
import PageHeader from 'common/PageHeader'
import TreatmentHistoryModal from './TreatmentHistoryModal'

import { Table, Button, Switch } from 'common'
import { LOADER, FETCH, APPOINTMENT, LIST } from 'services'
import { cssFontH3, colorGrey } from 'common/styles/style-base'

const EditContainer = styled.div`
  display: flex;
`
const EditContainerLabel = styled.div`
  ${cssFontH3}
  color: ${colorGrey};
  margin-right: 1rem;
`

const AppointmentStatus = (props) => {
  const { editable, editTreatment, treatmentData, updateEdit, updateTreatmentHistory, handleUpdateReport } = props
  const { dataSource, columns } = formatStatus(props)

  return (
    <div>
      <PageHeader title={'สถานะการนัดหมาย'}>
        <EditContainer>
          <EditContainerLabel>แก้ไข</EditContainerLabel>
          <Switch checked={editable} onChange={updateEdit} />
        </EditContainer>
      </PageHeader>
      <Table columns={columns} dataSource={dataSource} />
      { editTreatment &&  
        <TreatmentHistoryModal data={treatmentData} visible={editTreatment} onCancel={updateTreatmentHistory} onSubmit={handleUpdateReport} />
      }
    </div>
  )
}

const enhance = compose(
  LOADER,
  FETCH(APPOINTMENT, LIST),
  withStateHandlers(
    { 
      editable: false,
      editTreatment: false,
      treatmentData: null
    },
    { 
      updateEdit: ({ editable }) => (e) => ({ 
        editable: !editable, 
      }),
      updateTreatmentHistory: ({ editTreatment }) => (treatmentData) => { 
        if (!editTreatment) {
          return { editTreatment: !editTreatment, treatmentData }
        }

        return { editTreatment: !editTreatment, treatmentData: null }
      },
      handleUpdateReport: ({ treatmentData, editTreatment }, { appointments }) => (report) => {
        const { appointment } = treatmentData
        const newAppointments = appointments

        newAppointments.forEach((app) => {
          if (app._id === appointment._id) {
            app.report = report
          }
        })

        return { appointments: newAppointments, editTreatment: !editTreatment, treatmentData: null }
      }
    }
  )
)

export default enhance(AppointmentStatus)