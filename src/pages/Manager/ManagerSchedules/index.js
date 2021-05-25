import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Modal, Text, Dimensions } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { FAB } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'
import { format } from 'date-fns'

const locale_br = require('date-fns/locale/pt-BR')
import { RequestContext } from '../../../contexts/request'
import { AuthContext } from '../../../contexts/auth'
import Api from '../../../services/api'
import TaskModal from '../../../components/Modals/TaskModal'
import DatePicker from '../../../components/DatePicker'
import WarningModal from '../../../components/Modals/WarningModal'

import TodayTasks from './TodayTasks'
import FutureTasks from './FutureTasks'

const initialLayout = { width: Dimensions.get('window').width };

import { Container, Header, Title } from './styles'

const ManagerSchedules = () => {

    const {
        todayTasks, loadTodayTasks,
        futureTasks, loadFutureTasks,
        loading
    } = useContext(RequestContext)
    const { user } = useContext(AuthContext)

    const [taskModal, setTaskModal] = useState(false)

    const [datePicker, setDatePicker] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [typeMessage, setTypeMessage] = useState('')
    const [text, setText] = useState('')
    const [selectedDate, setSelectedDate] = useState(moment().format())

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Hoje' },
        { key: 'second', title: 'Futuras' },
    ])

    const date = format(Date.parse(selectedDate), 'PPPP', { locale: locale_br })

    useEffect(() => {
        const interval = loadTodayTasks()
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = loadFutureTasks()
        return () => clearInterval(interval)
    }, [])

    const renderTabBar = props => (
        <TabBar {...props}
            renderLabel={({ route, color }) => (
                <Text style={{ color, fontSize: 15, height: 30 }}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{ backgroundColor: '#FFF' }}
            style={{ backgroundColor: '#292b2c', height: 35 }}
        />
    );

    const renderScene = SceneMap({
        first: () => (
            <TodayTasks
                data={todayTasks}
                loadPage={loadTodayTasks}
                loading={loading}
            />
        ),
        second: () => (
            <FutureTasks
                data={futureTasks}
                loadPage={loadFutureTasks}
                loading={loading}
            />
        )
    });

    const handleCreateTask = async () => {
        if (text) {

            const responde = await Api.createTask(text, selectedDate)

            if (responde && responde.status >= 200 && responde.status <= 205) {

                loadTodayTasks()
                loadFutureTasks()
                setText('')
                setSelectedDate(new Date())
                closeTaskModal()
            } else {
                setTypeMessage('Algo deu errado!' + responde.status)
                openWarningModal()
            }

        } else {
            setTypeMessage('Informe uma descrição!')
            openWarningModal()
        }
    }

    const onChange = async (currentDate) => {
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
                <Title style={{ color: '#FFF' }}>Tarefas de {user.name}</Title>
            </Header>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

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
                    minimumDate={new Date()}
                />
            }

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