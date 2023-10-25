import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import type { ContenfulEvent } from '~/data/contentful'
import RichTextResponse from './richText'

export default function Modal({ open, setOpen, eventData }: { open: boolean, setOpen: any, eventData: ContenfulEvent | undefined }) {
    const cancelButtonRef = useRef(null)

    if (!eventData) {
        return null
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                                                {eventData.title}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-md text-gray-500">
                                                    <p className='text-base'>{eventData.locationName}</p>
                                                    <a href={`https://www.google.com/maps/search/?api=1&query=${eventData.streetAddress}`} className="text-blue-400 text-base" target="blank">
                                                        {eventData.streetAddress}
                                                    </a>
                                                </p>
                                            </div>
                                            <div className="mt-4">
                                                <img src={eventData?.image?.url} className="w-full h-auto mb-4"/>
                                            </div>
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500">
                                                    {RichTextResponse(eventData.description)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
