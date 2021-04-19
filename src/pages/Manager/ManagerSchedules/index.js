import React, { useState, useEffect, useContext, Fragment } from 'react'
import { RefreshControl, StyleSheet, Modal } from 'react-native'
import { FAB } from 'react-native-paper'
import { format } from 'date-fns'

const locale_br = require('date-fns/locale/pt-BR')
import { RequestContext } from '../../../contexts/request'
import Api from '../../../services/api'
import TasksList from '../TasksList'
import TaskModal from '../../../components/Modals/TaskModal'
import DatePicker from '../../../components/DatePicker'
import Loader from '../../../components/Loader'
import WarningModal from '../../../components/Modals/WarningModal'

import {
    Container, Header, PageBox, FlatList, Title, ListTitle, Divider,
    ListTitleBox, EmptyListCard
} from './styles'

const ManagerSchedules = () => {

    const { tasks, loadTasks, loading } = useContext(RequestContext)
    const newDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    const today = format(Date.parse(newDate), 'PPP', { locale: locale_br })

    const [isRefreshing, setIsRefreshing] = useState(false)
    const [taskModal, setTaskModal] = useState(false)

    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [text, setText] = useState('')
    const [selectedDate, setSelectedDate] = useState(newDate)

    const date = format(Date.parse(selectedDate), 'PPPP', { locale: locale_br })

    useEffect(() => {
        const interval = loadTasks()
        return () => clearInterval(interval)
    }, [])

    const onRefreshList = () => {
        setIsRefreshing(true)
        loadTasks()
        setIsRefreshing(false)
    }

    const handleCreateTask = async () => {
        if (text) {
            await Api.createTask(text, selectedDate)
            loadTasks()
            setText('')
            setSelectedDate(new Date())
            closeTaskModal()
        } else {
            setTypeMessage('Informe uma descrição!')
            openWarningModal()
        }
    }

    const onChange = async (currentDate) => {
        console.log(currentDate)
        setDatePicker(Platform.OS === 'ios')
        setSelectedDate(currentDate)
    }

    const openTaskModal = () => setTaskModal(true)
    const closeTaskModal = () => setTaskModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <Header>
                <Title style={{ color: '#FFF' }}>Atividades</Title>
            </Header>
            <PageBox>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) =>
                        <TasksList
                            data={item}
                            loadTasks={loadTasks}
                        />
                    }
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefreshList} />}
                    ListHeaderComponent={
                        <Fragment>
                            <ListTitleBox>
                                <ListTitle>lista de tarefas - {today}</ListTitle>
                            </ListTitleBox>
                            <Divider style={{ elevation: 1 }} />
                        </Fragment>
                    }
                    ListEmptyComponent={
                        <EmptyListCard>
                            <Title>Sem tarefas hoje</Title>
                        </EmptyListCard>
                    }
                    stickyHeaderIndices={[0]}
                />
            </PageBox>
            <FAB
                label='Tarefa'
                style={styles.fab}
                icon="plus"
                onPress={openTaskModal}
            />
            {datePicker &&
                <DatePicker
                    chosenDate={selectedDate}
                    onSet={onChange}
                />
            }
            {loading && !isRefreshing && <Loader />}

            <Modal
                animationType='slide'
                transparent={true}
                visible={taskModal}
            >
                <TaskModal
                    closeModal={closeTaskModal}
                    confirmModal={handleCreateTask}
                    setDatePicker={setDatePicker}
                    today={date}
                    setText={setText}
                    text={text}
                />
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={warningModal}
            >
                <WarningModal
                    closeModal={closeWarningModal}
                    message={typeMessage}
                    bgColor={true}
                />
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#2a9d8f',
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 10,
    },
})

export default ManagerSchedules