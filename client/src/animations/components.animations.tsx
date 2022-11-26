export const ChatComponentAnimations = {
    chat: {
        visible: {
            x: 0,
            opacity: 1
        },
        hidden: {
            x: 250,
            opacity: 0
        }
    }
}

export const CreateRoomComponentAnimations = {
    background: {
        visible: { 
            backgroundColor: 'rgba(0, 0, 0, .25)',
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: { backgroundColor: 'rgba(0, 0, 0, 0)' }
    },
    modal: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: {
            y: 200,
            opacity: 0
        },
        exit: {
            y: 200,
            opacity: 0,
            transition: { damping: 30 }
        }
    }
}

export const LoginComponentAnimations = {
    login: {
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 12.5
            }
        },
        hidden: {
            x: 250,
            opacity: 0
        },
        exit: {
            x: -250,
            opacity: 0,
            transition: { damping: 6.25 }
        }
    }
}

export const MenuComponentAnimations = {
    menu: {
        visible: { left: 0 },
        hidden: { left: '-100vw' }
    }
}

export const MessageComponentAnimations = {
    message: {
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: { opacity: 0 }
    }
}

export const NoRoomComponentAnimations = {
    container: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: {
            y: 50,
            opacity: 0
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { damping: 15 }
        }
    },
    emoji: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: {
            y: 50,
            opacity: 0
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { damping: 15 }
        }
    },
    title: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30,
                delay: .2
            }
        },
        hidden: {
            y: 50,
            opacity: 0
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { 
                damping: 15,
                delay: .2 
            }
        }
    },
    paragraph: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30,
                delay: .4 
            }
        },
        hidden: {
            y: 50,
            opacity: 0
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { 
                damping: 15,
                delay: .4 
            }
        }
    }
}

export const RoomComponentAnimations = {
    room: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: {
            y: 50,
            opacity: 0
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { damping: 15 }
        }
    }
}

export const RoomHeaderComponentAnimations = {
    title: {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: .2,
                type: 'spring',
                damping: 30
            }
        },
        hidden: {
            y: 15,
            opacity: 0
        },
        exit: {
            y: -15,
            opacity: 0,
            transition: { damping: 15 }
        }
    }
}

export const RoomItemComponentAnimations = {
    item: {
        visible: {
            y: 0,
            opacity: 1
        },
        hidden: {
            y: 50,
            opacity: 0
        }
    }
}