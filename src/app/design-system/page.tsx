"use client";
import { useState } from 'react'
import ModeSwitcher from '@/components/template/ThemeConfigurator/ModeSwitcher'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Alert from '@/components/ui/Alert'
import Checkbox from '@/components/ui/Checkbox'
import CloseButton from '@/components/ui/CloseButton'
import Radio from '@/components/ui/Radio'
import Switcher from '@/components/ui/Switcher'
import Progress from '@/components/ui/Progress'
import Skeleton from '@/components/ui/Skeleton'
import Segment from '@/components/ui/Segment'
import Dialog from '@/components/ui/Dialog'
import Drawer from '@/components/ui/Drawer'
import Dropdown from '@/components/ui/Dropdown'
import Tabs from '@/components/ui/Tabs'
import Tooltip from '@/components/ui/Tooltip'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Table from '@/components/ui/Table'
import Select from '@/components/ui/Select'
import Tag from '@/components/ui/Tag'
import Notification from '@/components/ui/Notification'
import Timeline from '@/components/ui/Timeline'
import Steps from '@/components/ui/Steps'
import Slider from '@/components/ui/Slider'
import Menu from '@/components/ui/Menu'
import Upload from '@/components/ui/Upload'
import { HiUser } from 'react-icons/hi'

export default function DesignSystemPage() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <div className="min-h-screen bg-base p-10 flex flex-col gap-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Neumorphic Design System</h1>
                <ModeSwitcher />
            </div>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Buttons</h2>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Button>Default Button</Button>
                    <Button variant="solid">Solid Button</Button>
                    <Button variant="plain">Plain Button</Button>
                    <Button disabled>Disabled Button</Button>
                    <Button loading>Loading Button</Button>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Inputs</h2>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <div className="w-full max-w-xs">
                        <Input placeholder="Default Input" />
                    </div>
                    <div className="w-full max-w-xs">
                        <Input placeholder="Disabled Input" disabled />
                    </div>
                    <div className="w-full max-w-xs">
                        <Input placeholder="Invalid Input" invalid />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Select</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo max-w-sm">
                    <Select options={[{ value: '1', label: 'Option 1' }, { value: '2', label: 'Option 2' }]} />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tags</h2>
                <div className="flex gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Tag>Tag 1</Tag>
                    <Tag className="text-primary">Primary Tag</Tag>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Timeline</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Timeline>
                        <Timeline.Item>Event 1</Timeline.Item>
                        <Timeline.Item>Event 2</Timeline.Item>
                        <Timeline.Item>Event 3</Timeline.Item>
                    </Timeline>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Steps</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Steps current={1}>
                        <Steps.Item title="Step 1" />
                        <Steps.Item title="Step 2" />
                        <Steps.Item title="Step 3" />
                    </Steps>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Slider</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Slider defaultValue={30} />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Menu</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo max-w-sm">
                    <Menu className="menu-light">
                        <Menu.MenuItem eventKey="1">Menu Item 1</Menu.MenuItem>
                        <Menu.MenuItem eventKey="2">Menu Item 2</Menu.MenuItem>
                    </Menu>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Notification</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo max-w-md">
                    <Notification title="New Message">
                        You have received a new message from a buyer!
                    </Notification>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Upload</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Upload draggable />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Cards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-base rounded-3xl shadow-neo">
                    <Card header={{ content: 'Static Card' }}>
                        <p className="text-gray-600 dark:text-gray-400">This is a standard card with a default Neumorphic outer shadow.</p>
                    </Card>
                    <Card clickable header={{ content: 'Clickable Card' }}>
                        <p className="text-gray-600 dark:text-gray-400">This card is clickable and intrudes with an inner shadow when you hover over it.</p>
                    </Card>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Badges</h2>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Badge content="CONFIDENT" />
                    <Badge content="TRUSTED" />
                    <Badge content="PENDING" />
                    <Badge content={5} />
                    <Badge content="99+" />
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">Dot Badge:</span>
                        <Badge />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Avatars</h2>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="sm" icon={<HiUser />} />
                        <span className="text-xs text-gray-500">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="md" icon={<HiUser />} />
                        <span className="text-xs text-gray-500">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="lg" icon={<HiUser />} />
                        <span className="text-xs text-gray-500">Large</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="md">AB</Avatar>
                        <span className="text-xs text-gray-500">Initials</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size="md" shape="square" icon={<HiUser />} />
                        <span className="text-xs text-gray-500">Square</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Alerts</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo">
                    <Alert type="success" showIcon title="Success">
                        Operation completed successfully.
                    </Alert>
                    <Alert type="info" showIcon title="Information">
                        Here is some helpful information.
                    </Alert>
                    <Alert type="warning" showIcon title="Warning">
                        Please review before proceeding.
                    </Alert>
                    <Alert type="danger" showIcon title="Error">
                        Something went wrong.
                    </Alert>
                    <Alert type="info" showIcon closable>
                        This alert can be dismissed.
                    </Alert>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Checkboxes</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Checkbox>Default</Checkbox>
                    <Checkbox defaultChecked>Checked</Checkbox>
                    <Checkbox disabled>Disabled</Checkbox>
                    <Checkbox disabled defaultChecked>Disabled Checked</Checkbox>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Close Buttons</h2>
                <div className="flex flex-wrap gap-6 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <div className="flex flex-col items-center gap-2">
                        <CloseButton />
                        <span className="text-xs text-gray-500">Default</span>
                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Radio</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Radio name="demoRadio" value="1" defaultChecked>Option 1</Radio>
                    <Radio name="demoRadio" value="2">Option 2</Radio>
                    <Radio name="demoRadio" value="3" disabled>Disabled</Radio>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Switcher</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Switcher defaultChecked />
                    <Switcher />
                    <Switcher disabled defaultChecked />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Progress</h2>
                <div className="flex flex-col gap-8 p-8 bg-base rounded-3xl shadow-neo w-full max-w-md">
                    <Progress percent={45} />
                    <Progress percent={100} customColorClass="bg-emerald-500" />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Skeleton</h2>
                <div className="flex flex-col gap-4 p-8 bg-base rounded-3xl shadow-neo w-full max-w-md">
                    <div className="flex items-center gap-4">
                        <Skeleton variant="circle" width={48} height={48} />
                        <div className="flex flex-col gap-2 flex-1">
                            <Skeleton variant="block" height={16} />
                            <Skeleton variant="block" height={16} width="60%" />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Segment</h2>
                <div className="flex p-8 bg-base rounded-3xl shadow-neo">
                    <Segment defaultValue="daily">
                        <Segment.Item value="daily">Daily</Segment.Item>
                        <Segment.Item value="weekly">Weekly</Segment.Item>
                        <Segment.Item value="monthly">Monthly</Segment.Item>
                    </Segment>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Dialog & Drawer</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
                    <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
                        <h5 className="mb-4">Dialog Title</h5>
                        <p>This is the content of the dialog.</p>
                        <div className="text-right mt-6">
                            <Button variant="solid" onClick={() => setDialogOpen(false)}>Close</Button>
                        </div>
                    </Dialog>

                    <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
                    <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Drawer Title">
                        <p>This is the drawer content.</p>
                    </Drawer>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Dropdown</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Dropdown title="Click Me">
                        <Dropdown.Item>Action 1</Dropdown.Item>
                        <Dropdown.Item>Action 2</Dropdown.Item>
                        <Dropdown.Item>Action 3</Dropdown.Item>
                    </Dropdown>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tabs</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Tabs defaultValue="tab1" variant="pill">
                        <Tabs.TabList>
                            <Tabs.TabNav value="tab1">Tab 1</Tabs.TabNav>
                            <Tabs.TabNav value="tab2">Tab 2</Tabs.TabNav>
                            <Tabs.TabNav value="tab3">Tab 3</Tabs.TabNav>
                        </Tabs.TabList>
                    </Tabs>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Tooltip</h2>
                <div className="flex flex-wrap gap-8 items-center p-8 bg-base rounded-3xl shadow-neo">
                    <Tooltip title="This is a tooltip">
                        <Button variant="solid">Hover Me</Button>
                    </Tooltip>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Form</h2>
                <div className="flex flex-col gap-8 p-8 bg-base rounded-3xl shadow-neo">
                    <FormContainer>
                        <FormItem label="Username" invalid={false} errorMessage="Please enter username">
                            <Input placeholder="Enter username" />
                        </FormItem>
                        <FormItem label="Password" invalid={true} errorMessage="Password is required">
                            <Input placeholder="Enter password" type="password" invalid />
                        </FormItem>
                        <FormItem>
                            <Button variant="solid">Submit</Button>
                        </FormItem>
                    </FormContainer>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Table</h2>
                <div className="flex flex-col gap-8 p-8 bg-base rounded-3xl shadow-neo">
                    <Table>
                        <Table.THead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Role</Table.Th>
                                <Table.Th>Status</Table.Th>
                            </Table.Tr>
                        </Table.THead>
                        <Table.TBody>
                            <Table.Tr>
                                <Table.Td>Alice Johnson</Table.Td>
                                <Table.Td>Admin</Table.Td>
                                <Table.Td><Badge content="Active" /></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td>Bob Smith</Table.Td>
                                <Table.Td>Editor</Table.Td>
                                <Table.Td><Badge content="Inactive" /></Table.Td>
                            </Table.Tr>
                        </Table.TBody>
                    </Table>
                </div>
            </section>
        </div>
    )
}

