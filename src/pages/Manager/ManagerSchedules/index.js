import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Modal, Text, Dimensions } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { FAB } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'
import { format } from 'date-fns'

const locale_br = require('date-fns/locale/pt-BR')
import { RequestContext } from '../../../contexts/request'
import Api from '../../../services/api'
import TaskModal from '../../../components/Modals/TaskModal'
import DatePicker from '../../../components/DatePicker'
import WarningModal from '../../../components/Modals/WarningModal'
import FilterTaskModal from '../../../components/Modals/FilterTaskModal'

import { filterByBetweenDates } from '../../../helpers/index'

import TodayTasks from './TodayTasks'
import FutureTasks from './FutureTasks'

const initialLayout = { width: Dimensions.get('window').width };

import { Container, Header, Title } from './styles'

const ManagerSchedules = () => {

    const [state, setState] = useState({ open: false })
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state

    const [range, setRange] = useState({})

    const {
        todayTasks, loadTodayTasks, loading,
        futureTasks, loadFutureTasks
    } = useContext(RequestContext)

    const [taskModal, setTaskModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)

    const [futureResults, setFutureResults] = useState([])

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
        setFutureResults(futureTasks)
    }, [futureTasks])

    useEffect(() => {
        if (range?.endDate && range?.startDate) {
            const result = filterByBetweenDates(futureTasks, range?.startDate, range?.endDate)
            setFutureResults(result)
        } else {
            setFutureResults(futureTasks)
        }
    }, [range])

    useEffect(() => {
        loadTodayTasks()
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

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <TodayTasks
                    data={todayTasks}
                    loadPage={loadTodayTasks}
                    loading={loading}
                />
            case 'second':
                return <FutureTasks
                    data={futureResults}
                    loadPage={loadFutureTasks}
                    loading={loading}
                />
            default:
                return null;
        }
    }

    const handleCreateTask = async () => {
        if (text) {

            const responde = await Api.createTask(text, selectedDate)

            if (responde && responde.status >= 200 && responde.status <= 205) {
                closeTaskModal()
                await loadTodayTasks()
                await loadFutureTasks()
                setText('')
                setSelectedDate(new Date())
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
    const openFilterModal = () => setFilterModal(true)
    const closeFilterModal = () => setFilterModal(false)
    const openWarningModal = () => setWarningModal(true)
    const closeWarningModal = () => setWarningModal(false)

    return (
        <Container>
            <Header>
                <Title style={{ color: '#FFF' }}>Lista de Tarefas</Title>
            </Header>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={renderTabBar}
            />

            {index !== 0
                ?
                <FAB.Group
                    open={open}
                    icon={open ? 'close' : 'menu'}
                    fabStyle={{ backgroundColor: '#2a9d8f' }}
                    actions={[
                        {
                            icon: 'magnify',
                            label: 'Filtrar',
                            onPress: () => openFilterModal(),
                        },
                        {
                            icon: 'plus',
                            label: 'Tarefa',
                            onPress: () => openTaskModal(),
                        },
                    ]}
                    onStateChange={onStateChange}
                    theme={{ colors: { accent: 'blue' } }}
                />
                :
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={openTaskModal}
                />
            }

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
                animationType='slide'
                transparent={true}
                visible={filterModal}
                onRequestClose={closeFilterModal}
            >
                <FilterTaskModal
                    closeModal={closeFilterModal}
                    range={range}
                    setRange={setRange}
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
        bottom: 0,
    },
})

export default ManagerSchedules