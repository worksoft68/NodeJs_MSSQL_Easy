USE [master]
GO
/****** Object:  Database [FutureOffice]    Script Date: 26/10/2023 9:36:38 AM ******/
CREATE DATABASE [FutureOffice]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FutureOffice', FILENAME = N'D:\Database\FutureOffice\FutureOffice.mdf' , SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'FutureOffice_log', FILENAME = N'D:\Database\FutureOffice\FutureOffice_log.ldf' , SIZE = 24384KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [FutureOffice] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [FutureOffice].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [FutureOffice] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [FutureOffice] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [FutureOffice] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [FutureOffice] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [FutureOffice] SET ARITHABORT OFF 
GO
ALTER DATABASE [FutureOffice] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [FutureOffice] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [FutureOffice] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [FutureOffice] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [FutureOffice] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [FutureOffice] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [FutureOffice] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [FutureOffice] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [FutureOffice] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [FutureOffice] SET  DISABLE_BROKER 
GO
ALTER DATABASE [FutureOffice] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [FutureOffice] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [FutureOffice] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [FutureOffice] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [FutureOffice] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [FutureOffice] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [FutureOffice] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [FutureOffice] SET RECOVERY FULL 
GO
ALTER DATABASE [FutureOffice] SET  MULTI_USER 
GO
ALTER DATABASE [FutureOffice] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [FutureOffice] SET DB_CHAINING OFF 
GO
ALTER DATABASE [FutureOffice] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [FutureOffice] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [FutureOffice] SET DELAYED_DURABILITY = DISABLED 
GO
USE [FutureOffice]
GO
/****** Object:  Table [dbo].[Articles]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Articles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategorieId] [int] NOT NULL,
	[CompanyId] [int] NULL,
	[Title] [nvarchar](150) NOT NULL,
	[Slug] [nvarchar](150) NOT NULL,
	[Thumb] [nvarchar](255) NULL,
	[Summary] [nvarchar](1000) NOT NULL,
	[ContentArticles] [nvarchar](max) NOT NULL,
	[Ordering] [int] NULL,
	[Special] [bit] NULL,
	[Status] [bit] NULL,
	[User_Id_Approved] [int] NULL,
	[Username_Approved] [varchar](35) NULL,
	[Datetime_Approved] [datetime] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
	[Count_View] [int] NULL,
	[Count_Like] [int] NULL,
	[Count_Dislike] [int] NULL,
 CONSTRAINT [PK_Articles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Parent_Id] [int] NULL,
	[Company_Id] [int] NULL,
	[Name] [nvarchar](40) NOT NULL,
	[Slug] [nvarchar](40) NOT NULL,
	[Thumbnail] [nvarchar](255) NULL,
	[ViewType] [nvarchar](20) NOT NULL,
	[Link] [nvarchar](255) NULL,
	[Zone] [nvarchar](10) NULL,
	[ShowHomePage] [bit] NOT NULL,
	[Ordering] [int] NULL,
	[Description] [nvarchar](50) NULL,
	[Status] [bit] NOT NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Contact]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Fullname] [nvarchar](100) NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](25) NULL,
	[ContentMessage] [nvarchar](2000) NULL,
	[DoneProcessing] [int] NULL,
 CONSTRAINT [PK_Contact] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customers]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ModelMainBoard] [nvarchar](20) NULL,
	[MainBoardName] [nvarchar](20) NULL,
	[CPUID] [nvarchar](20) NULL,
	[YourName] [nvarchar](50) NULL,
	[UserName] [nvarchar](50) NULL,
	[UserName_Encrypted] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[Birthday] [date] NULL,
	[Sex] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[PhoneNumber] [nvarchar](20) NULL,
	[Address] [nvarchar](300) NULL,
	[RegistrationDate] [datetime] NULL,
	[ExtensionDate] [datetime] NULL,
	[Status] [nvarchar](20) NULL,
	[ReceiveEmail] [int] NULL,
	[LastLoginTime] [datetime] NULL,
	[IP] [nvarchar](15) NULL,
	[RemainingCodeGeneration] [int] NULL,
	[TotalNumberCodeGeneration] [int] NULL,
	[License] [nvarchar](50) NULL,
	[LicenseType] [nvarchar](20) NULL,
	[LicenseDate] [datetime] NULL,
	[LicenceExpired] [date] NULL,
	[LinkFacebook] [nvarchar](300) NULL,
	[DeviceNumber] [nvarchar](8) NULL,
	[Acction] [nvarchar](200) NULL,
	[DateCustomersAcction] [datetime] NULL,
	[LinkSharedSocialNetworks] [nvarchar](400) NULL,
	[AmountDonated] [int] NULL,
	[DateAmountDonated] [datetime] NULL,
	[UserNote] [nvarchar](50) NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Customers_Device]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customers_Device](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCustomers] [bigint] NULL,
	[ModelMainBoard] [nvarchar](20) NULL,
	[MainBoardName] [nvarchar](20) NULL,
	[CPUID] [nvarchar](20) NULL,
	[LastLoginTime] [datetime] NULL,
	[IP] [nvarchar](15) NULL,
	[NumberOfCodeGeneration] [int] NULL,
	[DateCreate] [datetime] NULL,
	[DeviceNumber] [nvarchar](8) NULL,
 CONSTRAINT [PK_Customers_Device] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CustomersCodeGeneration]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomersCodeGeneration](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[IdCustomers] [bigint] NULL,
	[IdCustomers_Device] [bigint] NULL,
	[ModelMainBoard] [nvarchar](20) NULL,
	[MainBoardName] [nvarchar](20) NULL,
	[CPUID] [nvarchar](20) NULL,
	[ClassName] [nvarchar](50) NULL,
	[DateCreated] [datetime] NULL,
	[CodeGenerationWithLicence] [nvarchar](20) NULL,
 CONSTRAINT [PK_CustomersCodeGeneration] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Group_Categories]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Group_Categories](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Slug] [nvarchar](50) NULL,
	[Ordering] [int] NULL,
	[Description] [nvarchar](50) NULL,
	[Status] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](50) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](50) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Group_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Product]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdProduct_Groups] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](100) NULL,
	[Ordering] [int] NULL,
	[Is_Using] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Product_Groups]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Groups](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Ordering] [int] NULL,
	[Description] [nvarchar](50) NULL,
	[Is_Using] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](50) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](50) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Product_Groups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Company]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Company](
	[CompanyId] [bigint] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](200) NULL,
	[Address] [nvarchar](100) NULL,
	[Provincial] [bigint] NULL,
	[District] [bigint] NULL,
	[Email1] [nvarchar](50) NULL,
	[Email2] [nvarchar](50) NULL,
	[PhoneNumber1] [nvarchar](20) NULL,
	[PhoneNumber2] [nvarchar](20) NULL,
	[NumberWorkers] [int] NULL,
	[Notes] [nvarchar](200) NULL,
	[RenewalDate] [datetime] NULL,
	[ExpirationDate] [datetime] NULL,
	[RepresentativeName] [nvarchar](50) NULL,
	[LinkFaceBook] [nvarchar](300) NULL,
	[UpdatePerson] [bigint] NULL,
	[UpdateDay] [datetime] NULL,
	[RegistrationAmount] [int] NULL,
	[RegisteredStorage] [int] NULL,
	[RegisteredSMS] [int] NULL,
	[RegistrationAmountSMS] [int] NULL,
	[BankAccountNumber1] [nvarchar](15) NULL,
	[BankName1] [nvarchar](50) NULL,
	[BankAccountNumber2] [nvarchar](15) NULL,
	[Status] [nvarchar](5) NULL,
	[BankName2] [nvarchar](50) NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_Company] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_CustomSettings]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sys_CustomSettings](
	[KeySettings] [nvarchar](50) NOT NULL,
	[Image] [nvarchar](255) NULL,
	[UseCKEditor] [bit] NOT NULL,
	[Value] [nvarchar](1500) NOT NULL,
	[DefaultValue] [nvarchar](1500) NOT NULL,
	[Location] [nvarchar](50) NOT NULL,
	[StartTime] [datetime] NOT NULL,
	[EndTime] [datetime] NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Status] [bit] NOT NULL,
	[Ordering] [int] NULL,
	[IsSystem] [bit] NOT NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_CustomSettings] PRIMARY KEY CLUSTERED 
(
	[KeySettings] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sys_Department]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Department](
	[DepartmentId] [bigint] IDENTITY(1,1) NOT NULL,
	[CompanyId] [bigint] NOT NULL,
	[DepartmentName] [nvarchar](50) NOT NULL,
	[Abbreviation] [nvarchar](15) NULL,
	[NumericalOrder] [int] NULL,
	[Status] [nvarchar](5) NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_District]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_District](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ProvincialId] [bigint] NULL,
	[DistrictName] [nvarchar](70) NULL,
	[Note] [nvarchar](255) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_District] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Exchange_Log_Content]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sys_Exchange_Log_Content](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LogSubjectId] [int] NULL CONSTRAINT [DF_Sys_Exchange_Log_Content_LogSubjectId]  DEFAULT ((0)),
	[LogSubject] [nvarchar](40) NULL,
	[ExchangeLogId] [int] NULL CONSTRAINT [DF_Sys_Exchange_Log_Content_ExchangeLogId]  DEFAULT ((0)),
	[Title] [nvarchar](150) NOT NULL,
	[Image] [nvarchar](300) NULL,
	[Content_Exchange] [nvarchar](1000) NOT NULL,
	[Status] [nvarchar](15) NULL,
	[Status_Processed] [nvarchar](15) NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](40) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](40) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_Exchange_Log_Content] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sys_Exchange_Log_Subject]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sys_Exchange_Log_Subject](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](40) NOT NULL,
	[Ordering] [int] NOT NULL,
	[Description] [nvarchar](50) NULL,
	[Status] [nvarchar](9) NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](40) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](40) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Exchange_Log_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sys_FunctionForPermission]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Sys_FunctionForPermission](
	[FunctionName] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[Note] [nvarchar](255) NULL,
	[ModuleSystem] [nvarchar](255) NULL,
	[Status] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [varchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [varchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_FunctionForPermission] PRIMARY KEY CLUSTERED 
(
	[FunctionName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Sys_Permission]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Permission](
	[PermissionId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[Functions] [nvarchar](50) NOT NULL,
	[FullAuthority] [bit] NULL,
	[Addnew] [bit] NULL,
	[Updates] [bit] NULL,
	[ReadOnly] [bit] NULL,
	[FullOfYourself] [bit] NULL,
	[Permission1] [bit] NULL,
	[Permission2] [bit] NULL,
	[Permission3] [bit] NULL,
	[Permission4] [bit] NULL,
	[Permission5] [bit] NULL,
	[Permission6] [bit] NULL,
	[Permission7] [bit] NULL,
	[Permission8] [bit] NULL,
	[Permission9] [bit] NULL,
	[Permission10] [bit] NULL,
	[DateUpdate] [datetime] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_Permission_1] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[Functions] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Position]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Position](
	[PositionId] [bigint] IDENTITY(1,1) NOT NULL,
	[PositionName] [nvarchar](50) NOT NULL,
	[NumericalOrder] [int] NULL,
	[IsManager] [bit] NULL,
	[Status] [nvarchar](5) NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Position] PRIMARY KEY CLUSTERED 
(
	[PositionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Provincial]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Provincial](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ProvincialName] [nvarchar](50) NULL,
	[Area] [nvarchar](70) NULL,
	[Notes] [nvarchar](255) NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Provincial] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Role]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[NumericalOrder] [int] NULL,
	[Status] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_Role_Permission]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Role_Permission](
	[RolePermissionId] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [int] NOT NULL,
	[Functions] [nvarchar](50) NOT NULL,
	[FullAuthority] [bit] NULL,
	[Addnew] [bit] NULL,
	[Updates] [bit] NULL,
	[ReadOnly] [bit] NULL,
	[FullOfYourself] [bit] NULL,
	[Permission1] [bit] NULL,
	[Permission2] [bit] NULL,
	[Permission3] [bit] NULL,
	[Permission4] [bit] NULL,
	[Permission5] [bit] NULL,
	[Permission6] [bit] NULL,
	[Permission7] [bit] NULL,
	[Permission8] [bit] NULL,
	[Permission9] [bit] NULL,
	[Permission10] [bit] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_Role_Permission] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC,
	[Functions] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_SystemRights]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_SystemRights](
	[SystemRightsId] [int] NOT NULL,
	[SystemRightsName] [nvarchar](50) NOT NULL,
	[Notes] [nvarchar](50) NULL,
	[NumericalOrder] [int] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_Sys_SystemRights] PRIMARY KEY CLUSTERED 
(
	[SystemRightsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_User]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_User](
	[UsersId] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeCode] [nvarchar](15) NOT NULL,
	[CompanyId] [bigint] NOT NULL,
	[DepartmentId] [bigint] NOT NULL,
	[PositionId] [bigint] NOT NULL,
	[LastName] [nvarchar](30) NOT NULL,
	[FirstName] [nvarchar](30) NOT NULL,
	[UserName] [nvarchar](20) NOT NULL,
	[UserName_Encrypted] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NOT NULL,
	[Birthday] [datetime] NULL,
	[Sex] [nvarchar](10) NULL,
	[Email] [nvarchar](50) NULL,
	[PhoneNumber] [nvarchar](25) NULL,
	[Address] [nvarchar](100) NULL,
	[District] [bigint] NULL,
	[Provincial] [bigint] NULL,
	[Nation] [nvarchar](50) NULL,
	[IsManagement] [int] NULL,
	[Status] [nvarchar](10) NULL,
	[LastLoginTime] [datetime] NULL,
	[Avatar] [nvarchar](255) NULL,
	[ReceiveEmail] [int] NULL,
	[ReceiveSMS] [int] NULL,
	[FullPathTemporarySave] [nvarchar](255) NULL,
	[TemporaryFileName] [nvarchar](255) NULL,
	[PathTemporarySave] [nvarchar](255) NULL,
	[ManagerCode] [bigint] NULL,
	[LinkChangePassword] [nvarchar](200) NULL,
	[TokenChangePassword] [nvarchar](40) NULL,
	[NotificationTimeChangedPassword] [datetime] NULL,
	[TimeChangedPassword] [datetime] NULL,
	[BrowserHeaders] [nvarchar](2000) NULL,
	[StatusLogin] [int] NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_NguoiDung] PRIMARY KEY CLUSTERED 
(
	[UsersId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sys_User_Role]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_User_Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdRole] [int] NOT NULL,
	[UsersId] [int] NOT NULL,
	[User_Id_Created] [int] NULL,
	[User_Name_Created] [nvarchar](35) NULL,
	[DateTime_Created] [datetime] NULL,
	[User_Id_Modified] [int] NULL,
	[User_Name_Modified] [nvarchar](35) NULL,
	[DateTime_Modified] [datetime] NULL,
 CONSTRAINT [PK_Sys_User_Role_1] PRIMARY KEY CLUSTERED 
(
	[IdRole] ASC,
	[UsersId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SystemLog]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SystemLog](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Action] [nvarchar](15) NULL,
	[ImpactZone] [nvarchar](60) NULL,
	[IdTable] [nvarchar](25) NULL,
	[ContentLog] [nvarchar](2000) NULL,
	[ContentLogMax] [nvarchar](max) NULL,
	[IP] [nvarchar](15) NULL,
	[MacAddress] [nvarchar](20) NULL,
	[HostName] [nvarchar](200) NULL,
	[UserId] [bigint] NULL,
	[FullName] [nvarchar](40) NULL,
	[DateTimeLog] [datetime] NULL,
 CONSTRAINT [PK_SystemLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Articles] ON 

INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (3, 3, 1, N'Phần 1: Chuẩn bị project web', N'phan-1-chuan-bi-project-web', N'login-230701-JpWSgkbtgJ.JPG', N'Các bước thực hiện khi lần đầu chuẩn bị project web mà phần mềm  Developer NodeJs Easy hỗ trợ.
Bạn yên tâm! Các bước tuy phức tạp nhưng bạn chỉ cần thực hiện 1 lần thôi', N'<p>Bước 1: Tải phần mềm và project mã nguồn web về. Bạn chọn project sử dụng database phù hợp với yêu cầu của mình: Microsoft SQL Server, MySql, MonggoDb.</p><p>Bước 2: Restore database</p><p>Bước 3: Mở project web lên tìm đến file <strong>app\configs\database.js</strong> để cấu hình kết nối với database vừa restore ở trên.</p><p>Bước 4: Kiểm tra &  chỉnh lại port mà project đang sử dụng ở file <strong>bin\www</strong></p><p>Bước 5: Chạy project web.</p><p>Vậy là bạn đã hoàn thành chuẩn bị project web</p>', 100, 1, 1, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-04-16 18:46:09.483' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-01 13:08:59.577' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (4, 3, 1, N'Phần 2: Chuẩn bị phần mềm Developer NodeJs Easy để tạo mã nguồn tự động', N'phan-2-chuan-bi-phan-mem-developer-nodejs-easy-de-tao-ma-nguon-tu-dong', N'config-connect-database-230701-mV3Mxpwick.JPG', N'Các bước thực hiện khi lần đầu sử dụng phần mềm Developer NodeJs Easy để tạo ra mã nguồn trang web tự động.
Bạn yên tâm! Các bước tuy phức tạp nhưng bạn chỉ cần thực hiện 1 lần thôi', N'<p>Sau khi bạn đã chuẩn bị project web hoàn tất thì thực tiếp các bước sau:</p><p>A: Kết nối database</p><p>Bước 1: Tải phần mềm phần mềm Developer NodeJs Easy về máy mình và giải nén ra</p><p>Bước 2: Chạy phần mềm Developer NodeJs Easy</p><p>Bước 3: Click vào nút Config để cấu hình chọn loại database. Xong rồi bạn nhấn nút save. Sau đó khởi bạn hãy khởi động lại phần mềm Developer NodeJs Easy.</p><p>Bước 4: Nhập đầy đủ các thông tin vào để kết nối với database, Sau đó nhấn nút Connect. Nếu kết nối với database thành công thì bạn nhấn nút Save Connect để lần sau sẽ tự động kết nối.</p><p>B: Cấu hình đường dẫn:</p><p>Để lưu các file mã nguồn khi phần mềm tạo mã nguồn. Bạn cấu hình trỏ về project web bạn đã chuẩn bị trước đó. các file như: schemas, models, routes, controllers, API Documentation swagger, validates, views, languages. Code được sinh ra sẽ được thêm trực tiếp vào project web của bạn.</p><p>C. Kết nối table & sinh ra mã nguồn</p><p>Bước 1: Bạn tạo 1 table đơn giản trên database của của projec. Lưu ý: Có 6 cột mặc định bạn nên tạo. Nếu không có phần mềm sẽ hỏi bạn có tạo không? nếu bạn chọn có thì phần mềm sẽ tạo giúp bạn.</p><p>Đối với Microsoft SQL Server: Các cột đó là:</p><p>    User_Id_Created: ''int'',</p><p>    User_Name_Created: ''string'',</p><p>    DateTime_Created: ''DateTime'',</p><p>    User_Id_Modified: ''int'',</p><p>    User_Name_Modified: ''string'',</p><p>    DateTime_Modified: ''DateTime'',</p><p> </p><p>Đối với MySql và MonggoDb là: </p><p>    user_id_created: ''int'',<br />    user_name_created: ''string'',<br />    datetime_created: ''DateTime'',<br />    user_id_modified: ''int'',<br />    user_name_modified: ''string'',<br />    datetime_modified: ''DateTime'',</p><p>Bước 2: Click chọn database trên phần mềm Developer NodeJs Easy sau đó click chọn table bạn cần sinh ra mã nguồn web (table vừa tạo ở trên).</p><p>Bước 3: Qua tab Schemas, chọn lại control type lại nếu thấy chưa phù hợp. Bạn nên chọn các control đơn giản như text, number. bạn qua cột Text Control để chỉnh lại nếu cần, đó là nội dung sẽ được trình bày trên giao diện.</p><p>Bước 4: nhấn nút Create Code để sinh ra mã nguồn.</p><p>Bạn nên xem video giới thiệu & hướng dẫn nhanh để biết chi tiết hơn nhé!</p><p><strong>Tiếng Việt:</strong></p><p>Video 1: Giới thiệu nhanh về phần mềm Developer NodeJs Easy</p><p>Video 2: Hướng dẫn nhanh về phần mềm Developer NodeJs Easy</p><p><strong>English:</strong></p><p>Video 1: Quick Introduction to Developer NodeJs Easy Software</p><p>Video 2: Quick Tutorial on Developer NodeJs Easy Software</p><p> </p><p> </p><p> </p>', 99, 0, 1, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-04-16 08:19:39.357' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-01 13:16:39.690' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (5, 3, 1, N'Phần 3: Tìm hiểu về Schemas, quan hệ primary & foreign key', N'phan-3-tim-hieu-ve-schemas-quan-he-primary--foreign-key', N'schemas-230701-yDhv7IRplo.JPG', N'Schemas: Làm việc với MonggoDb chúng ta có khái niện về Schema, nó là bộ khung, là lượt đồ của một collection, khái niệm collection trong MonggoDb tương tự như khai niệm table trong Microsoft SQL Server và MySql. 


', N'<p>Schemas chứa các thuộc tính, kiểu dữ liệu của table và collection nên có thể xem Schemas là 1 phần  của Model trong mô hình MVC.</p><p>Trong cấu trúc project này chúng ta sẽ tách ra Schemas ra khỏi Model.</p><p>Phần A. Tab Schemas: </p><p>1. Cột Data types: Bạn có thể thay đổi kiểu dữ liệu nếu phần mềm Developer NodeJs Easy chưa lấy chính xác.</p><p>2. Cột Control types: Bạn có thể đổi kiểu control theo ý của bạn, Đối với các cột là khóa ngoại cần liên lết với khóa chính ở 1 table khác thì bạn nên chọn là Search Box Filter. Đối với các kiểu dữ liệu là bool thì bạn có thể chọn  Checkbox hoặc Dropdown List.</p><p>3. Cột Hide: Nếu tít vào thì control đó có thêm thuộc tính hidden.</p><p>4. Cột Create control: nếu tít vào thì control đó sẽ được tạo, nếu không tit vào thì cột đó sẽ không được tạo control trên giao diện.</p><p>5. Cột Text Control: Đó là các chữ, các label trên giao diện</p><p>6. Cột Warning data error: Nếu bạn tít vào, thì chương trình sẽ tạo validate kiểm kiểm tra dữ liệu của thuộc tính đó. Bạn cần kết hợp với tab Message để cấu hình các câu thông báo lỗi trong khi validate dữ liệu. (sẽ có hướng dẫn sử dụng tab message riêng)</p><p>Phần B. Tab Primary - Foreign:</p><p>Nếu table của bạn có khóa ngoại và liên kết với khóa chính của table khác thì các tùy chọn trong tab  Primary - Foreign sẽ giúp bạn tự động inner join khi load dữ liệu, ngoài ra còn hỗ trợ bạn tự động tạo control "select box filter" trên giao diện. Chức năng này giúp việc lập trình vô cùng tiện lợi và nhanh chóng. Lưu ý là bên tab Schemas, bạn phải chọn kiểu control của thuộc tính này là select box filter. Chương trình này hỗ trợ tối đa 10 khóa ngoại trong 1 table.</p><p><strong>Cách dùng:</strong></p><p>1. Bạn tít vào cột Is dropdown nếu bạn muốn tạo control là select box filter. Lúc này ở grid view bên dưới sẽ trình bày tabe table chứa khóa chính mà khóa ngoại này liên kết tới.</p><p>2. Ở table chứa khóa chính: bạn tít vào 2 cột:  Cột Id (Primary  key) và cột Name (Cột chứa thông tin chính cần trình bày lên select box filter).</p><p> </p><p> </p><p> </p><p> </p>', 98, 1, 1, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-04-16 08:23:20.973' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-02 04:09:45.173' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (6, 3, 1, N'Phần 4: Tab Message và tab Button', N'phan-4-tab-message-va-tab-button', N'tab-message-button-230702-H5KqqcfwBM.JPG', N'Ở phần này, chúng ta sẽ tìm hiểu về cách cấu hình các cho thông  báo, cấu hình các nút trên giao diện web', N'<p>A. Tab Message</p><p>1. Cột Order và Property là 2 cột cố định không thể thay đổi. Bạn cần nhập thông tin vào cột Message để phần mềm sẽ trình bày tiêu đề trang và xuất hiện câu thông báo theo thông tin bạn đã nhập vào.</p><p>2. Cột Alert: Nếu bạn tít vào thì chương trình sẽ tạo validate cho thuộc tính đó, Chúng ta sẽ có validate ở phía client bằng javascript và validate  ở phía server.</p><p>3. Cột Min & Max là giá trị để validate. Tuy nhiên sẽ có nhiều trường hợp mà chúng tôi hỗ trợ chưa tốt. Ví dụ như validate ngày tháng. Chúng tối huy vọng rằng trong tương lai sẽ hỗ trợ tốt hơn cho các bạn!</p><p>B. Tab Button, </p><p>Template chúng ta đang sử thư viện Bootstrap. Ở tab này, chúng ta cấu hình các thuộc tính cho các button trên giao diện.</p><p>1. Name: Tên của button</p><p>2. Text: Thuộc tính text, title của button.</p><p>3. Type: Chọn kiểu là button hay submit.</p><p>4. Class: Chọn class cho button.</p><p>5. Size: Class kích thước của button.</p><p>6. Script function: Khi người dùng click chuột vào button thì sẽ gọi hàm javascript này.</p><p>7. Router: Khi người dùng click chuột vào button thì sẽ gọi hàm javascript ở "Script function" sau đó sẽ chuyển đến router này để tiếp tục xử lý trên phía server.</p>', 97, 1, 1, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-04-16 08:24:39.167' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-02 04:43:36.927' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (7, 1, 1, N'Các tiện ích của phần mềm Developer NodeJs Easy', N'cac-tien-ich-cua-phan-mem-developer-nodejs-easy', N'goithieu-model-view-230630-LT5R7ehc6Y.JPG', N'Developer NodeJs Easy là công cụ lập trình web siêu tốc với NodeJs.  
Phần mềm này là một công cụ hỗ trợ lập trình viên trong việc phát triển các trang web nhanh chóng và dễ dàng hơn với NodeJs. Đặc biệt, phần mềm này cung cấp tính năng tương thích với các database phổ biến như SQL Server hoặc MySql hoặc monggoDb. Điều này giúp cho lập trình viên có thể tùy ý lựa chọn database phù hợp với nhu cầu của dự án.
Bạn có thể phát triển 1 chức năng, 1 giao diện danh mục chỉ khoản 3 - 4 phút,
', N'<p>Các lý do để bạn sử dụng phần mềm Developer NodeJs Easy</p><p>1. Phát triển ứng dụng rất nhanh, Phần mềm Developer NodeJs Easy sẽ giúp bạn hoàn thành 1 giao diện (danh mục) hoàn chỉnh chỉ trong vòng 3-4 phút bao gồm các chức năng: Thếm mới, xóa, sửa, tra cứu, xuất re excel.</p><p>2. Hỗ trợ tự động inner join 2 cấp:</p><p>VD: Nhân viên thuộc phòng ban, vậy khi thiết kế giao diện quản lý nhân viên, phần mềm sẽ tự động lấy danh sách phòng ban lên và đưa vào select box filter.</p><p>3. Fom linh động: Bạn có thể chọn 1 trong 3 loại: modal form hoặc ẩn form hoặc form được tình bày sẳn trên giao diện khi truy cập vào trang.</p><p>4. Bố trí cột trong form: bạn được tùy ý lựa chon 2 cột, 4 cột, 6 cột hoặc 8 cột trên form của mình.</p><p>5. File ngôn ngữ riêng, bạn có thể phát triển ứng dụng đa ngôn ngữ và dễ cấu hình ngôn ngữ trên giao diện.</p><p>6. Bạn có thể cấu hình các tên hàm, tên các button và các cấu hình khác trên ứng dụng của bạn.</p><p>7. Gần 100% sử dụng ajax nên tốc độ nhanh đáng kể, việc code tay 100% giao diện dùng ajax sẽ mất rất nhiều thời gian của lạp trình viên.</p><p>8. Người dùng dễ dàng tùy chọn số lượng dòng được trình bày trên 1 trang.</p><p>9. Người dùng dễ dàng tùy chỉnh số cột hiển thị trên giao diện của mình trên máy tính của mình.</p><p>Bạn nên xem video giới thiệu & hướng dẫn nhanh để biết chi tiết hơn nhé!</p><p><strong>Tiếng Việt:</strong></p><p>Video 1: Giới thiệu nhanh về phần mềm Developer NodeJs Easy</p><p>Video 2: Hướng dẫn nhanh về phần mềm Developer NodeJs Easy</p><p><strong>English:</strong></p><p>Video 1: Quick Introduction to Developer NodeJs Easy Software</p><p>Video 2: Quick Tutorial on Developer NodeJs Easy Software</p><p> </p>', 2, 1, 1, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'3022-05-29 12:32:30.447' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-01 13:16:17.327' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (13, 3, 1, N'Phần 5: Cấu hình cho Model - View và Language', N'phan-5-cau-hinh-cho-model--view-va-language', N'model-view-languest-230702-rB6s6e4B3f.jpg', N'Chúng ta có thể đặt tên hàm trong model theo ý của mình. Cấu hình cách để sử dụng file ngôn ngữ, Cấu hình loại form và số cột trên view', N'<p> - Model: Bạn có thể đặt lại tên các phương thức trong model của bạn, các phương thức như: saveInsert, saveUpdate, deleteById, deleteList, listItems, getById, exportData, listItemForDropdown.</p><p>- Language & message: Có 2 tùy chọn như trên hình.</p><p>- Message Validates: Có 2 tùy chọn như trên hình.</p><p>- View: Bạn có thể chọn Form có 2 cột, 4,6 hoặc 8 cột. Cách trình bày form có 3 cách: </p><p>+ Show form: Mặc định sẽ trình bày from sẵn trên giao diện, nếu lần đầu sử dụng, bạn nên chọn loại này đễ dễ hiểu hơn!</p><p>+ Default hide form: Mặc định thì Form không có sẵn mã sẽ được aane đi, ở góc trên bên phải của giao diện có dấu +, bạn clcik vào để mở rộng from ra.</p><p>+ Modal form: Khi click vào nút thêm, tìm kiếm... thì mới mở ra Modal form.</p><p>Sau khi cấu hình xong, bạn nhấn nút Save congifg để lưu lại các cấu hình.</p><p>Nút Load default: được dùng khi bạn muốn phục hồi lại mặc định các cấu hình trong tab này.</p><p> </p>', 96, 0, 1, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2023-07-02 07:10:12.297' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-02 07:13:19.213' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (14, 3, 1, N'Phần 6: Cấu hình kiểm tra quyền, thông báo mặc định và các cấu hình khác', N'phan-6-cau-hinh-kiem-tra-quyen-thong-bao-mac-dinh-va-cac-cau-hinh-khac', N'anotherconfig-230702-DHaxkxbCd8.JPG', N'Trong phần nầy, chúng ta tìm hiểu về các cột mặt định trong table, collection để lưu lại tài khoản và thời gian thêm, cập nhật dữ liệu. Cách kiểm tra quyền truy cập vào các chức năng trên trang web của chúng ta và các thông báo mặc định', N'<p>Các cấu hình này bên nên cấu hình 1 lần và sử dụng thống nhất trong toàn dự án này của bạn</p><p>A. Tab Config 1:</p><p>1. Các cột mặt định trong table để lưu lại tài khoản và thời gian thêm, cập nhật dữ liệu:</p><p>- Tít vào cột Use: nghĩa là bạn đồng ý sử dụng cấu hình này.</p><p>- Cột Your column name: Trong tabe của bạn bắt buộc phải có cột này ví dụ như: User_Id_Created, User_Name_Created, DateTime_Created, User_Id_Modified, User_Name_Modified, DateTime_Modified. Nếu không có thì phần mềm Developer NodeJs Easy sẽ hỏi và tạo giúp bạn.</p><p>B. Tab Config Message:</p><p>Trong tab này sẽ cấu hình các câu thông báo mặc định cho tất cả các chức năng, Các cấu hình này sẽ được tự động load vào tab Message. Bạn chỉ cấu hình 1 lần cho dự án của mình, ở từng giao diện khác nhau thì bạn chỉ cấu hình ở tab Mesage.</p><p>Sau khi cấu hình xong, bạn nhấn nút Save congifg để lưu lại các cấu hình.</p><p>Nút Load default: được dùng khi bạn muốn phục hồi lại mặc định các cấu hình trong tab này.</p><p> </p>', 95, 0, 1, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2023-07-02 07:35:00.217' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Articles] ([Id], [CategorieId], [CompanyId], [Title], [Slug], [Thumb], [Summary], [ContentArticles], [Ordering], [Special], [Status], [User_Id_Approved], [Username_Approved], [Datetime_Approved], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified], [Count_View], [Count_Like], [Count_Dislike]) VALUES (15, 4, 1, N'Download product', N'download-product', N'', N'Please choose a product', N'<p>1. App: Automatic source code generation software: Developer NodeJs Easy</p><p>2. Website source code:</p><p>+ Use Microsoft SQL Server</p><p>+ Use MySql</p><p>+ Use MonggoDb</p>', 9999, 0, 1, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-04-16 18:46:09.483' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-02 13:45:15.773' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Articles] OFF
SET IDENTITY_INSERT [dbo].[Categories] ON 

INSERT [dbo].[Categories] ([Id], [Parent_Id], [Company_Id], [Name], [Slug], [Thumbnail], [ViewType], [Link], [Zone], [ShowHomePage], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, 0, 1, N'Giới thiệu', N'gioi-thieu', N'', N'view-link', N'articles/cac-tien-ich-cua-phan-mem-developer-nodejs-easy-7', N'Left', 1, 1, N'Giới thiệu', 1, 1, N'Admin Supper', CAST(N'2022-04-13 08:46:04.167' AS DateTime), 1, N'Supper Admin', CAST(N'2023-10-26 02:30:45.183' AS DateTime))
INSERT [dbo].[Categories] ([Id], [Parent_Id], [Company_Id], [Name], [Slug], [Thumbnail], [ViewType], [Link], [Zone], [ShowHomePage], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, 0, 1, N'Tính năng', N'tinh-nang', N'', N'view-list', NULL, N'Top', 1, 2, N'Tính năng', 0, 1, N'Admin Supper', CAST(N'2022-04-13 08:46:48.513' AS DateTime), 1, N'Supper Admin', CAST(N'2023-06-30 13:03:38.177' AS DateTime))
INSERT [dbo].[Categories] ([Id], [Parent_Id], [Company_Id], [Name], [Slug], [Thumbnail], [ViewType], [Link], [Zone], [ShowHomePage], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, 0, 1, N'Hướng dẫn', N'huong-dan', N'', N'view-list', NULL, N'Top', 1, 3, N'Hướng dẫn', 1, 1, N'Admin Supper', CAST(N'2022-04-13 08:47:11.723' AS DateTime), 1, N'Supper Admin', CAST(N'2023-06-30 10:51:13.680' AS DateTime))
INSERT [dbo].[Categories] ([Id], [Parent_Id], [Company_Id], [Name], [Slug], [Thumbnail], [ViewType], [Link], [Zone], [ShowHomePage], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, 0, 1, N'Download', N'download', N'', N'view-link', N'articles/download-product-15', N'Top', 1, 4, N'Download', 1, 1, N'Admin Supper', CAST(N'2022-04-16 04:27:03.390' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-02 13:37:05.037' AS DateTime))
INSERT [dbo].[Categories] ([Id], [Parent_Id], [Company_Id], [Name], [Slug], [Thumbnail], [ViewType], [Link], [Zone], [ShowHomePage], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5, 0, 1, N'About', N'about', N'', N'view-link', N'http://localhost:6968/admin/categories', N'Top', 0, 5, N'', 0, 1, N'Supper Admin', CAST(N'2023-07-05 03:11:58.677' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-05 03:18:10.713' AS DateTime))
SET IDENTITY_INSERT [dbo].[Categories] OFF
SET IDENTITY_INSERT [dbo].[Contact] ON 

INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (1, N'11111111111111111111', N'22222222222222', N'222333333333333333333333', N'334444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (2, N'11111111111111111111', N'22222222222222', N'222333333333333333333333', N'334444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (3, N'a33333333333333333333', N'b33333333333333333333', N'c3333333333333333333333', N'd333333333333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (4, N'1111111111111', N'22222222222222', N'2333333333333333333333', N'23333333333333333333332333333333333333333333233333333333333333333323333333333333333333332333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (5, N'1111111111111', N'22222222222222', N'2333333333333333333333', N'23333333333333333333332333333333333333333333233333333333333333333323333333333333333333332333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (6, N'1111111111111', N'22222222222222', N'2333333333333333333333', N'23333333333333333333332333333333333333333333233333333333333333333323333333333333333333332333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (7, N'1111111111111', N'22222222222222', N'2333333333333333333333', N'23333333333333333333332333333333333333333333233333333333333333333323333333333333333333332333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (8, N'1111111111111', N'22222222222222', N'2333333333333333333333', N'23333333333333333333332333333333333333333333233333333333333333333323333333333333333333332333333333333333333333', NULL)
INSERT [dbo].[Contact] ([Id], [Fullname], [Email], [Phone], [ContentMessage], [DoneProcessing]) VALUES (9, N'333333333333333', N'333333333335555555555555', N'333333333333333333', N'3333333333333333333333333333333333333333333333333333333', NULL)
SET IDENTITY_INSERT [dbo].[Contact] OFF
SET IDENTITY_INSERT [dbo].[Customers] ON 

INSERT [dbo].[Customers] ([Id], [ModelMainBoard], [MainBoardName], [CPUID], [YourName], [UserName], [UserName_Encrypted], [Password], [Birthday], [Sex], [Email], [PhoneNumber], [Address], [RegistrationDate], [ExtensionDate], [Status], [ReceiveEmail], [LastLoginTime], [IP], [RemainingCodeGeneration], [TotalNumberCodeGeneration], [License], [LicenseType], [LicenseDate], [LicenceExpired], [LinkFacebook], [DeviceNumber], [Acction], [DateCustomersAcction], [LinkSharedSocialNetworks], [AmountDonated], [DateAmountDonated], [UserNote]) VALUES (14, N'85F2', N'HP', N'BFEBFBFF000806EC', N'Thái Hòa', N'', NULL, NULL, NULL, N'Male', N'hoa.huynh@gmail.com', NULL, NULL, CAST(N'2023-07-24 02:42:12.743' AS DateTime), NULL, N'new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'83843025', N'', CAST(N'2023-07-24 08:32:58.630' AS DateTime), N'7777777777777777777777', 12345, CAST(N'2023-07-24 09:42:41.303' AS DateTime), N'abc')
SET IDENTITY_INSERT [dbo].[Customers] OFF
SET IDENTITY_INSERT [dbo].[Customers_Device] ON 

INSERT [dbo].[Customers_Device] ([Id], [IdCustomers], [ModelMainBoard], [MainBoardName], [CPUID], [LastLoginTime], [IP], [NumberOfCodeGeneration], [DateCreate], [DeviceNumber]) VALUES (6, 14, N'85F2', N'HP', N'BFEBFBFF000806EC', NULL, NULL, NULL, CAST(N'2023-07-24 02:42:12.790' AS DateTime), N'83843025')
SET IDENTITY_INSERT [dbo].[Customers_Device] OFF
SET IDENTITY_INSERT [dbo].[CustomersCodeGeneration] ON 

INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (25, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'sinhVien', CAST(N'2023-07-24 02:42:13.377' AS DateTime), N'SharedLink')
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (26, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'contact', CAST(N'2023-07-30 08:14:37.170' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (27, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'contact', CAST(N'2023-07-30 08:25:12.457' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (28, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customers', CAST(N'2023-08-04 04:30:00.107' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (29, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customers', CAST(N'2023-08-04 04:30:41.937' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (30, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customers', CAST(N'2023-08-04 04:32:01.557' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (31, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customerscodegeneration', CAST(N'2023-08-04 04:34:12.727' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (32, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customerscodegeneration', CAST(N'2023-08-04 04:34:34.037' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (33, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customerscodegeneration', CAST(N'2023-08-04 04:34:40.750' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (34, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customers_device', CAST(N'2023-08-04 04:35:51.343' AS DateTime), NULL)
INSERT [dbo].[CustomersCodeGeneration] ([Id], [IdCustomers], [IdCustomers_Device], [ModelMainBoard], [MainBoardName], [CPUID], [ClassName], [DateCreated], [CodeGenerationWithLicence]) VALUES (35, 14, 6, N'85F2', N'HP', N'BFEBFBFF000806EC', N'customers_device', CAST(N'2023-08-04 07:06:39.170' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[CustomersCodeGeneration] OFF
SET IDENTITY_INSERT [dbo].[Group_Categories] ON 

INSERT [dbo].[Group_Categories] ([Id], [Name], [Slug], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Group One', N'Group_One', 2, N'this is Group Two', 0, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), 1, N'Supper Admin', CAST(N'2023-04-28 03:21:24.840' AS DateTime))
INSERT [dbo].[Group_Categories] ([Id], [Name], [Slug], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, N'Group Two', N'Group_Two', 2, N'', 1, 1, N'Supper Admin', CAST(N'2023-04-28 03:17:48.970' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Group_Categories] ([Id], [Name], [Slug], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, N'Group Three', N'Group_Three', 3, N'', 1, 1, N'Supper Admin', CAST(N'2023-04-28 03:18:50.607' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Group_Categories] ([Id], [Name], [Slug], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5, N'Group Four', N'Group_Four', 4, N'', 1, 1, N'Supper Admin', CAST(N'2023-04-28 03:19:25.217' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Group_Categories] ([Id], [Name], [Slug], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (6, N'Group Five', N'Group_Five', 5, N'', 0, 1, N'Supper Admin', CAST(N'2023-04-28 03:19:49.000' AS DateTime), 1, N'Supper Admin', CAST(N'2023-04-28 03:35:45.963' AS DateTime))
SET IDENTITY_INSERT [dbo].[Group_Categories] OFF
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, 1, N'Product 1', N'Description for Product 1', 1, 1, 1, N'Supper Admin', CAST(N'2023-05-13 08:21:55.943' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, 2, N'Product 2 abc', N'Description for Product 2', 2, 1, 1, N'Supper Admin', CAST(N'2023-05-13 08:22:25.533' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-13 08:23:24.233' AS DateTime))
INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1002, 3, N'Product 3', N'', 0, 1, 1, N'Supper Admin', CAST(N'2023-05-15 03:08:16.693' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1003, 4, N'Product 4', N'', 4, 0, 1, N'Supper Admin', CAST(N'2023-05-15 03:08:26.850' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1004, 1, N'Product 5', N'', 5, 1, 1, N'Supper Admin', CAST(N'2023-05-15 03:08:42.873' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-15 03:09:15.407' AS DateTime))
INSERT [dbo].[Product] ([Id], [IdProduct_Groups], [Name], [Description], [Ordering], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1005, 2, N'Product 6', N'6', 6, 1, 1, N'Supper Admin', CAST(N'2023-05-15 03:09:35.023' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Product] OFF
SET IDENTITY_INSERT [dbo].[Product_Groups] ON 

INSERT [dbo].[Product_Groups] ([Id], [Name], [Ordering], [Description], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, N'Group One', 1, N'Group 1', 1, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product_Groups] ([Id], [Name], [Ordering], [Description], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Group Two', 2, N'Group 2', 1, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product_Groups] ([Id], [Name], [Ordering], [Description], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, N'Group Three', 3, N'Group 3', 1, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product_Groups] ([Id], [Name], [Ordering], [Description], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, N'Group Four', 4, N'Group 4', 1, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Product_Groups] ([Id], [Name], [Ordering], [Description], [Is_Using], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5, N'Group Five', 5, N'Group 5', 1, 1, N'Supper Admin', CAST(N'2023-04-28 02:42:06.697' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Product_Groups] OFF
SET IDENTITY_INSERT [dbo].[Sys_Company] ON 

INSERT [dbo].[Sys_Company] ([CompanyId], [CompanyName], [Address], [Provincial], [District], [Email1], [Email2], [PhoneNumber1], [PhoneNumber2], [NumberWorkers], [Notes], [RenewalDate], [ExpirationDate], [RepresentativeName], [LinkFaceBook], [UpdatePerson], [UpdateDay], [RegistrationAmount], [RegisteredStorage], [RegisteredSMS], [RegistrationAmountSMS], [BankAccountNumber1], [BankName1], [BankAccountNumber2], [Status], [BankName2], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, N'Company One', N'VietNam', NULL, NULL, N'', NULL, N'', NULL, NULL, N'', NULL, NULL, N'', N'', NULL, NULL, NULL, NULL, 0, NULL, N'', N'', NULL, N'true', NULL, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-26 10:46:56.807' AS DateTime))
INSERT [dbo].[Sys_Company] ([CompanyId], [CompanyName], [Address], [Provincial], [District], [Email1], [Email2], [PhoneNumber1], [PhoneNumber2], [NumberWorkers], [Notes], [RenewalDate], [ExpirationDate], [RepresentativeName], [LinkFaceBook], [UpdatePerson], [UpdateDay], [RegistrationAmount], [RegisteredStorage], [RegisteredSMS], [RegistrationAmountSMS], [BankAccountNumber1], [BankName1], [BankAccountNumber2], [Status], [BankName2], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Company Two', N'USA', NULL, NULL, N'', NULL, N'', NULL, NULL, N'', NULL, NULL, N'', N'', NULL, NULL, NULL, NULL, 0, NULL, N'', N'', NULL, N'true', NULL, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-26 10:46:43.737' AS DateTime))
INSERT [dbo].[Sys_Company] ([CompanyId], [CompanyName], [Address], [Provincial], [District], [Email1], [Email2], [PhoneNumber1], [PhoneNumber2], [NumberWorkers], [Notes], [RenewalDate], [ExpirationDate], [RepresentativeName], [LinkFaceBook], [UpdatePerson], [UpdateDay], [RegistrationAmount], [RegisteredStorage], [RegisteredSMS], [RegistrationAmountSMS], [BankAccountNumber1], [BankName1], [BankAccountNumber2], [Status], [BankName2], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, N'Company Three', N'Viet Nam', NULL, NULL, N'CompanyThree@gmail.eom', NULL, N'', NULL, NULL, N'', NULL, NULL, N'11', N'', NULL, NULL, NULL, NULL, NULL, NULL, N'', N'', NULL, N'true', NULL, 1, N'Supper Admin', CAST(N'2022-11-26 10:48:41.013' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-29 07:19:29.637' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sys_Company] OFF
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Ads Footer', N'', 0, N'<img class="img-fluid" src="uploads/sys_customsettings/adfooter-220820-ApL98J5zKk.jpg" alt=""> ', N'<img class="img-fluid" src="frontend/img/banner-ad.jpg" alt=""> ', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Ads Footer', 1, 13, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:43:32.707' AS DateTime), 1, N'Admin Supper', CAST(N'2022-08-21 04:45:45.663' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Banner Left - Logo', N'', 0, N'<a href="/"> <img class="img-fluid" src="uploads/sys_customsettings/logo-220820-iUXWOFGp8p.png" alt=""> </a>', N'<a href="/"> <img class="img-fluid" src="img/logo.png" alt=""> </a>', N'Banner left', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'logo banner image on the left', 1, 4, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:42:01.407' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Banner Right - Ads', N'', 0, N'<img class="img-fluid" src="uploads/sys_customsettings/banner-right-220821-bC8gqZff7m.jpg" alt="">
', N'<img class="img-fluid" src="img/banner-ad.jpg" alt="">', N'Banner right', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'right advertising banner', 1, 6, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:39:35.840' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Copyright Footer', N'', 0, N'  Copyright ©<script>document.write(new Date().getFullYear()); </script>&nbsp;<a href="https://colorlib.com" target="_blank">Developer NodeJs Easy</a>', N' Copyright ©<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>', N'Footer', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Footer on the left', 1, 11, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:36:56.273' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-04 13:34:14.800' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Footer Right', N'', 0, N'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', N'<a href="https://www.facebook.com/support/"><i class="fa fa-facebook"></i></a>
                <a href="https://google.com"><i class="fa fa-twitter"></i></a>
                <a href="https://www.youtube.com/channel/support"><i class="fa fa-dribbble"></i></a>
                <a href="https://tuoitre.vn/"><i class="fa fa-behance"></i></a>', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Icon Footer Right', 1, 12, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:35:34.287' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-04 13:32:01.490' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Header Right', N'', 0, N'<li><a href="tel:+84 999999999"><span class="lnr lnr-phone-handset"></span><span>+84 999999999</span></a></li> <li><a href="mailto:support@gmail.com"><span class="lnr lnr-envelope"></span><span>support@gmail.com</span></a></li> ', N'<li><a href="tel:+84 999999999"><span class="lnr lnr-phone-handset"></span><span>+84 999999999</span></a></li> <li><a href="mailto:support@gmail.com"><span class="lnr lnr-envelope"></span><span>support@gmail.com</span></a></li> ', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Header Right', 1, 1, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:34:44.967' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Icon Header Left', N'', 0, N'<li><a href="https://www.facebook.com/support/"><i class="fa fa-facebook"></i></a></li>

<li><a href="https://google.com"><i class="fa fa-twitter"></i></a></li>

 <li><a href="https://www.youtube.com/channel/UC39yv9DeazwM-FvSMQJYQAw"><i class="fa fa-dribbble"></i></a></li>

<li><a href="https://tuoitre.vn/"><i class="fa fa-behance"></i></a></li> ', N'<li><a href="https://www.facebook.com/support/"><i class="fa fa-facebook"></i></a></li>

<li><a href="https://google.com"><i class="fa fa-twitter"></i></a></li>

 <li><a href="https://www.youtube.com/channel/support"><i class="fa fa-dribbble"></i></a></li>

<li><a href="https://tuoitre.vn/"><i class="fa fa-behance"></i></a></li> ', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'link icon header left', 1, 1, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:33:42.420' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'image - Banner right', N'banner-right-220821-bC8gqZff7m.jpg', 0, N'Upload image to get link to create Banner right', N'Upload image to get link to create Banner right', N'Banner right', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'banner ad image right', 1, 5, 0, 1, N'Admin Supper', CAST(N'2022-08-21 04:24:41.270' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'image ads footer', N'adfooter-220820-ApL98J5zKk.jpg', 0, N' Get the link of the ad image', N' Get the link of the ad image', N'Adertisement end-of-page', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'ad image at the bottom of the page', 1, 10, 1, 1, N'Admin Supper', CAST(N'2022-08-20 09:05:55.387' AS DateTime), 1, N'Admin Supper', CAST(N'2022-08-20 09:10:03.073' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'image_logo', N'logo-220820-iUXWOFGp8p.png', 0, N'Get the logo link to create a banner', N'Get the logo link to create a banner', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'logo image', 1, 3, 1, 1, N'Admin Supper', CAST(N'2022-08-20 09:02:14.137' AS DateTime), 1, N'Admin Supper', CAST(N'2022-08-20 09:09:49.437' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Page_Ranges', N'', 0, N'5', N'5', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N' number of pages', 1, 1, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:32:37.717' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sildebar Right 2', N'', 0, N'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Convenient
<br/>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Very fast
<br/>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Effective
<br/>
<button type="button" class="btn btn-primary" onclick="location.href=''articles/download-product-15''">Download</button>

', N'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Convenient
<br/>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Very fast
<br/>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
</svg> Effective
<br/>
<button type="button" class="btn btn-primary" onclick="location.href=''articles/download-product-15''">Download</button>

', N'Sidebar right', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'', 1, 0, 0, 1, N'Admin Supper', CAST(N'2022-08-21 04:31:10.110' AS DateTime), 1, N'Supper Admin', CAST(N'2023-08-01 12:25:27.047' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Title Latest News', N'', 0, N'Hướng dẫn', N'Latest News', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Latest News', 1, 14, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:29:39.367' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-04 14:08:25.647' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Title Sildebar Right 1', N'', 0, N'Random Post', N'Random Post', N'Sidebar right', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Title Sildebar Right', 1, 7, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:28:30.667' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-27 06:55:36.047' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Title Sildebar Right 2', N'', 0, N'Special', N'Social Networks', N'Banner left', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Title Sildebar Right 2', 1, 8, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:27:25.773' AS DateTime), 1, N'Supper Admin', CAST(N'2023-07-04 13:21:28.133' AS DateTime))
INSERT [dbo].[Sys_CustomSettings] ([KeySettings], [Image], [UseCKEditor], [Value], [DefaultValue], [Location], [StartTime], [EndTime], [Description], [Status], [Ordering], [IsSystem], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Total_Items_Per_Page', N'', 0, N'3', N'10', N'General', CAST(N'2022-08-01 00:00:00.000' AS DateTime), CAST(N'3000-08-31 00:00:00.000' AS DateTime), N'Total_Items_Per_Page', 1, 1, 1, 1, N'Admin Supper', CAST(N'2022-08-21 04:25:49.537' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_Department] ON 

INSERT [dbo].[Sys_Department] ([DepartmentId], [CompanyId], [DepartmentName], [Abbreviation], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, 1, N'Board of manager', N'Business', 1, N'true', 13, N'B A', CAST(N'2022-03-08 07:40:44.003' AS DateTime), 13, N'B A', CAST(N'2022-03-08 07:41:56.457' AS DateTime))
INSERT [dbo].[Sys_Department] ([DepartmentId], [CompanyId], [DepartmentName], [Abbreviation], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, 1, N'Business', N'Business', 2, N'true', 13, N'B A', CAST(N'2022-03-08 07:41:18.457' AS DateTime), 13, N'B A', CAST(N'2022-03-08 07:41:45.367' AS DateTime))
INSERT [dbo].[Sys_Department] ([DepartmentId], [CompanyId], [DepartmentName], [Abbreviation], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, 1, N'Human resouces', N'HR', 3, N'true', 13, N'B A', CAST(N'2022-03-08 07:43:20.370' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Department] ([DepartmentId], [CompanyId], [DepartmentName], [Abbreviation], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, 1, N'IT', N'IT', 4, N'true', 13, N'B A', CAST(N'2022-03-08 07:47:01.530' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Department] ([DepartmentId], [CompanyId], [DepartmentName], [Abbreviation], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5, 1, N'Public User', N'Public User', 51, N'true', 13, N'B A', CAST(N'2022-03-08 07:47:01.530' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-29 07:20:44.590' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sys_Department] OFF
SET IDENTITY_INSERT [dbo].[Sys_District] ON 

INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (13, 51, N'Thành phố Long Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (14, 51, N'TP. Châu Đốc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (15, 51, N'Huyện An Phú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (16, 51, N'Huyện Tân Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (17, 51, N'Huyện Phú Tân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (18, 51, N'Huyện Tịnh Biên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (19, 51, N'Huyện Tri Tôn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (20, 51, N'Huyện Châu Phú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (21, 51, N'Huyện Chợ Mới', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (22, 51, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (23, 51, N'Huyện Thoại Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (48, 54, N'Thành phố Rạch Giá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (49, 54, N'Thị xã Hà Tiên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (50, 54, N'Huyện Kiên Lương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (51, 54, N'Huyện Hòn Đất', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (52, 54, N'Huyện Tân Hiệp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (53, 54, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (54, 54, N'Huyện Giồng Riềng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (55, 54, N'Huyện Gò Quao', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (56, 54, N'Huyện An Biên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (57, 54, N'Huyện An Minh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (58, 54, N'Huyện Vĩnh Thuận', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (59, 54, N'Huyện đảo Phú Quốc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (60, 54, N'Huyện Kiên Hải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (61, 54, N'Huyện U Minh Thượng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (62, 54, N'Huyện Giang Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (63, 55, N'Quận Ninh Kiều', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (64, 55, N'Quận Bình Thuỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (66, 55, N'Quận Ô Môn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (67, 55, N'Huyện Phong Điền', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (69, 55, N'Huyện Vĩnh Thạnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (70, 55, N'Quận Thốt Nốt', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (71, 55, N'Huyện Thới Lai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (72, 55, N'Quận Cái Răng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (73, 55, N'Huyện Cờ Đỏ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (74, 56, N'Thành phố Bến Tre', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (75, 56, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (76, 56, N'Huyện Chợ Lách', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (77, 56, N'Huyện Mỏ Cày Bắc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (78, 56, N'Huyện Giồng Trôm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (79, 56, N'Huyện Bình Đại', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (80, 56, N'Huyện Ba Tri', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (81, 56, N'Huyện Thạnh Phú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (82, 56, N'Huyện Mỏ Cày Nam', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (83, 57, N'Thành phố Vĩnh Long', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (84, 57, N'Huyện Long Hồ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (85, 57, N'Huyện Mang Thít', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (86, 57, N'Huyện Bình Minh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (87, 57, N'Huyện Tam Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (88, 57, N'Huyện Trà Ôn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (89, 57, N'Huyện Vũng Liêm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (90, 57, N'Huyện Bình Tân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (91, 58, N'Thành phố Trà Vinh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (92, 58, N'Huyện Càng Long', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (93, 58, N'Huyện Cầu Kè', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (94, 58, N'Huyện Tiểu Cần', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (95, 58, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (96, 58, N'Huyện Trà Cú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (97, 58, N'Huyện Cầu Ngang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (98, 58, N'Huyện Duyên Hải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (99, 59, N'Thành phố Sóc Trăng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (100, 59, N'Huyện Kế Sách', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (101, 59, N'Huyện Mỹ Tú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (102, 59, N'Huyện Mỹ Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (103, 59, N'Huyện Thạnh Trị', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (104, 59, N'Huyện Long Phú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (105, 59, N'Thị xã Vĩnh Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (106, 59, N'Huyện Cù Lao Dung', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (107, 59, N'Huyện Ngã Năm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (108, 59, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (109, 59, N'Huyện Trần Đề', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (110, 60, N'Thành phố Bạc Liêu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (111, 60, N'Huyện Vĩnh Lợi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (112, 60, N'Huyện Hồng Dân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (113, 60, N'Huyện Giá Rai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (114, 60, N'Huyện Phước Long', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (115, 60, N'Huyện Đông Hải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (116, 60, N'Huyện Hoà Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (117, 61, N'Thành phố Cà Mau', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (118, 61, N'Huyện Thới Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (119, 61, N'Huyện U Minh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (120, 61, N'Huyện Trần Văn Thời', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (121, 61, N'Huyện Cái Nước', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (122, 61, N'Huyện Đầm Dơi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (123, 61, N'Huyện Ngọc Hiển', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (124, 61, N'Huyện Năm Căn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (125, 61, N'Huyện Phú Tân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (126, 63, N'Thành phố Vị Thanh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (127, 63, N'Huyện Vị Thuỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (128, 63, N'Huyện Long Mỹ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (129, 63, N'Huyện Phụng Hiệp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (130, 63, N'Huyện Châu Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (131, 63, N'Huyện Châu Thành A', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (132, 63, N'Thị xã Ngã Bảy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (133, 1, N'Quận Ba Đình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (134, 1, N'Quận Hoàn Kiếm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (135, 1, N'Quận Hai Bà Trưng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (136, 1, N'Quận Đống Đa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (137, 1, N'Quận Tây Hồ', N'', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (138, 1, N'Quận Cầu Giấy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (139, 1, N'Quận Thanh Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (140, 1, N'Quận Hoàng Mai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (141, 1, N'Quận Long Biên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (142, 1, N'Huyện Từ Liêm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (143, 1, N'Huyện Thanh Trì', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (144, 1, N'Huyện Gia Lâm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (145, 1, N'Huyện Đông Anh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (146, 1, N'Huyện Sóc Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (147, 1, N'Quận Hà Đông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (148, 1, N'Thị xã Sơn Tây', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (149, 1, N'Huyện Ba Vì', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (150, 1, N'Huyện Phúc Thọ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (151, 1, N'Huyện Thạch Thất', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (152, 1, N'Huyện Quốc Oai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (153, 1, N'Huyện Chương Mỹ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (154, 1, N'Huyện Đan Phượng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (155, 1, N'Huyện Hoài Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (156, 1, N'Huyện Thanh Oai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (157, 1, N'Huyện Mỹ Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (158, 1, N'Huyện Ứng Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (159, 1, N'Huyện Thường Tín', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (160, 1, N'Huyện Phú Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (161, 1, N'Huyện Mê Linh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (162, 2, N'Quận 1', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (163, 2, N'Quận 2', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (164, 2, N'Quận 3', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (165, 2, N'Quận 4', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (166, 2, N'Quận 5', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (167, 2, N'Quận 6', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (168, 2, N'Quận 8', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (169, 2, N'Quận Gò Vấp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (170, 2, N'Quận 9', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (171, 2, N'Quận 10', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (172, 2, N'Quận 11', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (173, 2, N'Quận 12', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (174, 2, N'Quận Tân Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (175, 2, N'Quận Tân Phú', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (176, 2, N'Quận Bình Thạnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (177, 2, N'Quận Phú Nhuận', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (178, 2, N'Quận Thủ Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (179, 2, N'Quận Bình Tân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (180, 2, N'Huyện Bình Chánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (181, 2, N'Huyện Củ Chi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (182, 2, N'Huyện Hóc Môn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (183, 2, N'Huyện Nhà Bè', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (184, 2, N'Huyện Cần Giờ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (185, 64, N'Thị xã Gia Nghĩa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (186, 64, N'Huyện Đắk R’Lấp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (187, 64, N'Huyện Đắk Mil', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (188, 64, N'Huyện Cư Jút', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (189, 64, N'Huyện Đắk Song', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (190, 64, N'Huyện Krông Nô', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (191, 64, N'Huyện Đắk GLong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (192, 64, N'Huyện Tuy Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (202, 52, N'Thành phố Vũng Tàu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (203, 52, N'Thị xã Bà Rịa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (204, 52, N'Huyện Xuyên Mộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (205, 52, N'Huyện Long Điền', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (206, 52, N'Huyện Côn Đảo', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (207, 52, N'Huyện Tân Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (208, 52, N'Huyện Châu Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (209, 52, N'Huyện Đất Đỏ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (240, 45, N'Thành phố Phan Rang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (241, 45, N'Huyện Ninh Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (242, 45, N'Huyện Ninh Hải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (243, 45, N'Huyện Ninh Phước', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (244, 45, N'Huyện Bác Ái', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (245, 45, N'Huyện Thuận Bắc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (246, 45, N'Huyện Thuận Nam', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (247, 44, N'Thị xã Thủ Dầu Một', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (248, 44, N'Huyện Bến Cát', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (249, 44, N'Huyện Tân Uyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (250, 44, N'Huyện Thuận An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (251, 44, N'Huyện Dĩ An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (252, 44, N'Huyện Phú Giáo', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (253, 44, N'Huyện Dầu Tiếng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (264, 42, N'Thành phố Đà Lạt', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (265, 42, N'Thị xã Bảo Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (266, 42, N'Huyện Đức Trọng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (267, 42, N'Huyện Di Linh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (268, 42, N'Huyện Đơn Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (269, 42, N'Huyện Lạc Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (270, 42, N'Huyện Đạ Huoai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (271, 42, N'Huyện Đạ Tẻh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (272, 42, N'Huyện Cát Tiên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (273, 42, N'Huyện Lâm Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (274, 42, N'Huyện Bảo Lâm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (275, 42, N'Huyện Đam Rông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (276, 41, N'Thành phố Nha Trang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (277, 41, N'Huyện Vạn Ninh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (278, 41, N'Huyện Ninh Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (279, 42, N'Huyện Diên Khánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (280, 41, N'Huyện Khánh Vĩnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (281, 41, N'Thị xã Cam Ranh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (282, 41, N'Huyện Khánh Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (283, 41, N'Huyện đảo Trường Sa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (284, 41, N'Huyện Cam Lâm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (285, 40, N'Thành phố Buôn Ma Thuột', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (286, 40, N'Huyện Ea H Leo', N'', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (287, 40, N'Huyện Krông Buk', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (288, 40, N'Huyện Krông Năng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (289, 40, N'Huyện Ea Súp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (290, 40, N'Huyện Cư M’gar', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (291, 40, N'Huyện Krông Pắc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (292, 40, N'Huyện Ea Kar', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (293, 40, N'Huyện MĐrăk', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (294, 40, N'Huyện Krông Ana', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (295, 40, N'Huyện Krông Bông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (296, 40, N'Huyện Lăk', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (297, 40, N'Huyện Buôn Đôn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (298, 40, N'Huyện Cư Kuin', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (299, 40, N'Thị xã Buôn Hồ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (300, 39, N'Thành phố Tuy Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (301, 39, N'Huyện Đồng Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (302, 39, N'Thị xã Sông Cầu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (303, 39, N'Huyện Tuy An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (304, 39, N'Huyện Sơn Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (305, 39, N'Huyện Sông Hinh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (306, 39, N'Huyện Đông Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (307, 39, N'Huyện Phú Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (308, 39, N'Huyện Tây Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (309, 38, N'Thành phố Pleiku', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (310, 38, N'Huyện Chư Păh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (311, 38, N'Huyện Mang Yang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (312, 38, N'Huyện Kbang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (313, 38, N'Thị xã An Khê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (314, 38, N'Huyện Kông Chro', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (315, 38, N'Huyện Đức Cơ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (316, 38, N'Huyện Chư Prông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (317, 38, N'Huyện Chư Sê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (318, 38, N'Thị xã Ayunpa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (319, 38, N'Huyện Krông Pa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (320, 38, N'Huyện Ia Grai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (321, 38, N'Huyện Đăk Đoa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (322, 38, N'Huyện Ia Pa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (323, 38, N'Huyện Đăk Pơ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (324, 38, N'Huyện Phú Thiện', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (325, 38, N'Huyện Chư Pưh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (326, 37, N'Thành phố Quy Nhơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (327, 37, N'Huyện An Lão', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (328, 37, N'Huyện Hoài Ân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (329, 37, N'Huyện Hoài Nhơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (330, 37, N'Huyện Phù Mỹ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (331, 37, N'Huyện Phù Cát', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (332, 37, N'Huyện Vĩnh Thạnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (333, 37, N'Huyện Tây Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (334, 37, N'Huyện Vân Canh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (335, 37, N'Huyện An Nhơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (336, 37, N'Huyện Tuy Phước', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (337, 36, N'Thành phố KonTum', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (338, 36, N'Huyện Đăk Glei', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (339, 36, N'Huyện Ngọc Hồi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (340, 36, N'Huyện Đăk Tô', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (341, 36, N'Huyện Sa Thầy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (342, 36, N'Huyện Kon Plong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (343, 36, N'Huyện Đăk Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (344, 36, N'Huyện Kon Rẫy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (345, 36, N'Huyện Tu Mơ Rông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (346, 35, N'Thành phố Quảng Ngãi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (347, 35, N'Huyện Lý Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (348, 35, N'Huyện Bình Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (349, 35, N'Huyện Trà Bồng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (350, 35, N'Huyện Sơn Tịnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (351, 35, N'Huyện Sơn Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (352, 35, N'Huyện Tư Nghĩa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (353, 35, N'Huyện Nghĩa Hành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (354, 35, N'Huyện Minh Long', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (355, 35, N'Huyện Mộ Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (356, 35, N'Huyện Đức Phổ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (357, 35, N'Huyện Ba Tơ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (358, 35, N'Huyện Sơn Tây', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (359, 35, N'Huyện Tây Trà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (360, 34, N'Thành phố Tam Kỳ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (361, 34, N'Thành phố Hội An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (362, 34, N'Huyện Duy Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (363, 34, N'Huyện Điện Bàn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (364, 34, N'Huyện Đại Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (365, 34, N'Huyện Quế Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (366, 34, N'Huyện Hiệp Đức', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (367, 34, N'Huyện Thăng Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (368, 34, N'Huyện Núi Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (369, 34, N'Huyện Tiên Phước', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (370, 34, N'Huyện Bắc Trà My', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (371, 34, N'Huyện Đông Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (372, 34, N'Huyện Nam Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (373, 34, N'Huyện Phước Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (374, 34, N'Huyện Nam Trà My', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (375, 34, N'Huyện Tây Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (376, 34, N'Huyện Phú Ninh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (377, 34, N'Huyện Nông Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (378, 33, N'Thành phố Huế', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (379, 33, N'Huyện Phong Điền', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (380, 33, N'Huyện Quảng Điền', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (381, 33, N'Huyện Hương Trà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (382, 33, N'Huyện Phú Vang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (383, 33, N'Huyện Hương Thủy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (384, 33, N'Huyện Phú Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (385, 33, N'Huyện Nam Đông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (386, 33, N'Huyện A Lưới', N'', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (387, 32, N'Thành phố Đông Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (388, 32, N'Thị xã Quảng Trị', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (389, 32, N'Huyện Vĩnh Linh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (390, 32, N'Huyện Gio Linh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (391, 32, N'Huyện Cam Lộ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (392, 32, N'Huyện Triệu Phong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (393, 32, N'Huyện Hải Lăng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (394, 32, N'Huyện Hướng Hóa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (395, 32, N'Huyện Đăk Rông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (396, 32, N'Huyện đảo Cồn Cỏ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (397, 31, N'Thành phố Đồng Hới', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (398, 31, N'Huyện Tuyên Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (399, 31, N'Huyện Minh Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (400, 31, N'Huyện Quảng Trạch', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (401, 31, N'Huyện Bố Trạch', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (402, 31, N'Huyện Quảng Ninh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (403, 31, N'Huyện Lệ Thuỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (404, 30, N'Thành phố Hà Tĩnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (405, 30, N'Thị xã Hồng Lĩnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (406, 30, N'Huyện Hương Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (407, 30, N'Huyện Đức Thọ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (408, 30, N'Huyện Nghi Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (409, 30, N'Huyện Can Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (410, 30, N'Huyện Hương Khê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (411, 30, N'Huyện Thạch Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (412, 30, N'Huyện Cẩm Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (413, 30, N'Huyện Kỳ Anh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (414, 30, N'Huyện Vũ Quang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (415, 30, N'Huyện Lộc Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (416, 29, N'Thành phố Vinh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (417, 29, N'Thị xã Cửa Lò', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (418, 29, N'Huyện Quỳ Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (419, 29, N'Huyện Quỳ Hợp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (420, 29, N'Huyện Nghĩa Đàn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (421, 29, N'Huyện Quỳnh Lưu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (422, 29, N'Huyện Kỳ Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (423, 29, N'Huyện Tương Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (424, 29, N'Huyện Con Cuông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (425, 29, N'Huyện Tân Kỳ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (426, 29, N'Huyện Yên Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (427, 29, N'Huyện Diễn Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (428, 29, N'Huyện Anh Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (429, 29, N'Huyện Đô Lương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (430, 29, N'Huyện Thanh Chương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (431, 29, N'Huyện Thanh Chương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (432, 29, N'Huyện Nam Đàn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (433, 29, N'Huyện Hưng Nguyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (434, 29, N'Huyện Quế Phong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (435, 29, N'Thị xã Thái Hòa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (436, 28, N'Thành phố Thanh Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (437, 28, N'Thị xã Bỉm Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (438, 28, N'Thị xã Sầm Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (439, 28, N'Huyện Quan Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (440, 28, N'Huyện Quan Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (441, 28, N'Huyện Mường Lát', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (442, 28, N'Huyện Bá Thước', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (443, 28, N'Huyện Thường Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (444, 28, N'Huyện Như Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (445, 28, N'Huyện Như Thanh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (446, 28, N'Huyện Lang Chánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (447, 28, N'Huyện Ngọc Lặc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (448, 28, N'Huyện Thạch Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (449, 28, N'Huyện Cẩm Thủy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (450, 28, N'Huyện Thọ Xuân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (451, 28, N'Huyện Vĩnh Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (452, 28, N'Huyện Thiệu Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (453, 28, N'Huyện Triệu Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (454, 28, N'Huyện Nông Cống', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (455, 28, N'Huyện Đông Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (456, 28, N'Huyện Hà Trung', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (457, 28, N'Huyện Hoằng Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (458, 28, N'Huyện Nga Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (459, 28, N'Huyện Hậu Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (460, 28, N'Huyện Quảng Xương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (461, 28, N'Huyện Tĩnh Gia', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (462, 28, N'Huyện Yên Định', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (463, 27, N'Thành phố Ninh Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (464, 27, N'Huyện Yên Khánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (465, 27, N'Huyện Nho Quan', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (466, 27, N'Huyện Gia Viễn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (467, 27, N'Huyện Hoa Lư', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (468, 27, N'Huyện Yên Mô', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (469, 27, N'Huyện Kim Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (470, 27, N'Huyện Yên Khánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (471, 26, N'Thành phố Thái Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (472, 26, N'Huyện Quỳnh Phụ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (473, 26, N'Huyện Hưng Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (474, 26, N'Huyện Đông Hưng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (475, 26, N'Huyện Vũ Thư', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (476, 26, N'Huyện Kiến Xương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (477, 26, N'Huyện Tiền Hải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (478, 26, N'Huyện Thái Thuỵ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (479, 25, N'Thành phố Nam Định', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (480, 25, N'Huyện Mỹ Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (481, 25, N'Huyện Xuân Trường', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (482, 25, N'Huyện Giao Thủy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (483, 25, N'Huyện Ý Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (484, 25, N'Huyện Vụ Bản', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (485, 25, N'Huyện Nam Trực', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (486, 25, N'Huyện Trực Ninh', N'', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (487, 25, N'Huyện Nghĩa Hưng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (488, 25, N'Huyện Hải Hậu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (489, 24, N'Thành phố Phủ Lý', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (490, 24, N'Huyện Duy Tiên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (491, 24, N'Huyện Kim Bảng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (492, 24, N'Huyện Lý Nhân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (493, 24, N'Huyện Thanh Liêm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (494, 24, N'Huyện Bình Lục', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (495, 23, N'Thành phố Hoà Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (496, 23, N'Huyện Đà Bắc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (497, 23, N'Huyện Mai Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (498, 23, N'Huyện Tân Lạc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (499, 23, N'Huyện Lạc Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (500, 23, N'Huyện Kỳ Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (501, 23, N'Huyện Lư­ơng Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (502, 23, N'Huyện Kim Bôi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (503, 23, N'Huyện Lạc Thuỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (504, 23, N'Huyện Yên Thuỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (505, 23, N'Huyện Cao Phong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (506, 22, N'Thành phố Hưng Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (507, 22, N'Huyện Kim Động', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (508, 22, N'Huyện Ân Thi', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (509, 22, N'Huyện Khoái Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (510, 22, N'Huyện Yên Mỹ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (511, 22, N'Huyện Tiên Lữ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (512, 22, N'Huyện Phù Cừ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (513, 22, N'Huyện Mỹ Hào', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (514, 22, N'Huyện Văn Lâm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (515, 22, N'Huyện Văn Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (516, 21, N'Thành phố Hải Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (517, 21, N'Thành phố Hải Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (518, 21, N'Huyện Nam Sách', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (519, 21, N'Huyện Kinh Môn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (520, 21, N'Huyện Gia Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (521, 21, N'Huyện Tứ Kỳ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (522, 21, N'Huyện Thanh Miện', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (523, 21, N'Huyện Ninh Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (524, 21, N'Huyện Cẩm Giàng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (525, 21, N'Huyện Thanh Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (526, 21, N'Huyện Kim Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (527, 21, N'Huyện Bình Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (528, 20, N'Thành phố Bắc Ninh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (529, 20, N'Huyện Yên Phong', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (530, 20, N'Huyện Quế Võ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (531, 20, N'Huyện Tiên Du', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (532, 20, N'Thị xã Từ Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (533, 20, N'Huyện Thuận Thành', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (534, 20, N'Huyện Gia Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (535, 20, N'Huyện Lương Tài', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (536, 18, N'Thành phố Bắc Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (537, 18, N'Huyện Yên Thế', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (538, 18, N'Huyện Lục Ngạn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (539, 18, N'Huyện Sơn Động', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (540, 18, N'Huyện Lục Nam', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (541, 18, N'Huyện Tân Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (542, 18, N'Huyện Hiệp Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (543, 18, N'Huyện Lạng Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (544, 18, N'Huyện Việt Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (545, 18, N'Huyện Yên Dũng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (546, 4, N'Thành phố Hạ Long', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (547, 17, N'Thành phố Cẩm Phả', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (548, 17, N'Thành phố Uông Bí', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (549, 17, N'Thành phố Móng Cái', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (550, 17, N'Huyện Bình Liêu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (551, 17, N'Huyện Đầm Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (552, 17, N'Huyện Hải Hà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (553, 17, N'Huyện Tiên Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (554, 17, N'Huyện Ba Chẽ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (555, 17, N'Huyện Đông Triều', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (556, 17, N'Huyện Yên Hưng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (557, 17, N'Huyện Hoành Bồ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (558, 17, N'Huyện Vân Đồn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (559, 17, N'Huyện Cô Tô', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (560, 16, N'Thành phố Vĩnh Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (561, 16, N'Huyện Tam Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (562, 16, N'Huyện Lập Thạch', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (563, 16, N'Huyện Vĩnh Tường', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (564, 16, N'Huyện Yên Lạc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (565, 16, N'Huyện Bình Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (566, 16, N'Huyện Sông Lô', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (567, 16, N'Thị xã Phúc Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (568, 16, N'Huyện Tam Đảo', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (569, 1, N'TP. Việt Trì', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (570, 15, N'Thị xã Phú Thọ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (571, 15, N'Huyện Đoan Hùng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (572, 15, N'Huyện Thanh Ba', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (573, 15, N'Huyện Hạ Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (574, 15, N'Huyện Cẩm Khê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (575, 15, N'Huyện Yên Lập', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (576, 15, N'Huyện Thanh Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (577, 15, N'Huyện Phù Ninh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (578, 15, N'Huyện Lâm Thao', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (579, 15, N'Huyện Tam Nông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (580, 15, N'Huyện Thanh Thủy', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (581, 15, N'Huyện Tân Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (582, 14, N'Thành phố Sơn La', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (583, 14, N'Huyện Quỳnh Nhai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (584, 14, N'Huyện Mường La', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (585, 14, N'Huyện Thuận Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (586, 14, N'Huyện Bắc Yên', N'', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (587, 14, N'Huyện Phù Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (588, 14, N'Huyện Mai Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (589, 14, N'Huyện Yên Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (590, 14, N'Huyện Sông Mã', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (591, 14, N'Huyện Mộc Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (592, 14, N'Huyện Sốp Cộp', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (593, 13, N'Thành phố Yên Bái', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (594, 13, N'Thị xã Nghĩa Lộ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (595, 13, N'Huyện Văn Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (596, 13, N'Huyện Yên Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (597, 13, N'Huyện Mù Cang Chải', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (598, 13, N'Huyện Văn Chấn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (599, 13, N'Huyện Trấn Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (600, 13, N'Huyện Trạm Tấu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (601, 13, N'Huyện Lục Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (602, 12, N'TP.Thái Nguyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (603, 12, N'Thị xã Sông Công', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (604, 12, N'Huyện Định Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (605, 12, N'Huyện Phú Lương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (606, 12, N'Huyện Võ Nhai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (607, 12, N'Huyện Đại Từ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (608, 12, N'Huyện Đồng Hỷ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (609, 12, N'Huyện Phú Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (610, 12, N'Huyện Phổ Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (611, 11, N'Thị xã Bắc Kạn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (612, 11, N'Huyện Chợ Đồn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (613, 11, N'Huyện Bạch Thông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (614, 11, N'Huyện Na Rì', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (615, 11, N'Huyện Ngân Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (616, 11, N'Huyện Ba Bể', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (617, 11, N'Huyện Chợ Mới', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (618, 11, N'Huyện Pác Nặm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (619, 10, N'Thành phố Lạng Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (620, 10, N'Huyện Tràng Định', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (621, 10, N'Huyện Bình Gia', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (622, 10, N'Huyện Văn Lãng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (623, 10, N'Huyện Bắc Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (624, 10, N'Huyện Văn Quan', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (625, 10, N'Huyện Cao Lộc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (626, 10, N'Huyện Lộc Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (627, 10, N'Huyện Chi Lăng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (628, 10, N'Huyện Đình Lập', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (629, 10, N'Huyện Hữu Lũng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (630, 9, N'Th. phố Tuyên Quang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (631, 9, N'Huyện Lâm Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (632, 9, N'Huyện Na Hang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (633, 9, N'Huyện Chiêm Hoá', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (634, 9, N'Huyện Hàm Yên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (635, 9, N'Huyện Yên Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (636, 9, N'Huyện Sơn Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (637, 8, N'Thành phố Lào Cai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (638, 8, N'Huyện Xi Ma Cai', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (639, 8, N'Huyện Bát Xát', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (640, 8, N'Huyện Bảo Thắng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (641, 6, N'Huyện Sa Pa', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (642, 8, N'Huyện Văn Bàn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (643, 1, N'Huyện Bảo Yên', N'aaaaaaaaaaaaaaaaaaaaa', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (644, 6, N'Huyện Bắc Hà', N'bbbbbbbbbbbbbbbbb', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (645, 8, N'Huyện Mường Khương', N'', 0)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (646, 7, N'Thị xã Lai Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (651, 7, N'Huyện Than Uyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (652, 7, N'Huyện Tân Uyên', N'', 0)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (653, 61, N'Thị xã Cao Bằng', N'1111111111111111', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (654, 6, N'Huyện Bảo Lạc', N'cccccccccccccccccccccccccc', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (655, 6, N'Huyện Thông Nông', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (656, 4, N'Huyện Hà Quảng', N'bbbbb   bbbbbbb    bbbbb', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (657, 6, N'Huyện Trà Lĩnh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (658, 6, N'Huyện Trùng Khánh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (659, 6, N'Huyện Nguyên Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (660, 6, N'Huyện Hoà An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (661, 6, N'Huyện Quảng Uyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (662, 6, N'Huyện Thạch An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (663, 6, N'Huyện Hạ Lang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (664, 6, N'Huyện Bảo Lâm', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (665, 6, N'Huyện Phục Hoà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (666, 5, N'Thành phố Hà Giang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (667, 5, N'Huyện Đồng Văn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (668, 5, N'Huyện Mèo Vạc', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (669, 5, N'Huyện Yên Minh', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (670, 5, N'Huyện Quản Bạ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (671, 5, N'Huyện Vị Xuyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (672, 5, N'Huyện Bắc Mê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (673, 5, N'Huyện Hoàng Su Phì', N'aaaaaaaaa', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (674, 5, N'Huyện Xín Mần', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (675, 5, N'Huyện Bắc Quang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (676, 5, N'Huyện Quang Bình', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (677, 4, N'Quận Hải Châu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (678, 4, N'Quận Thanh Khê', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (679, 4, N'Quận Sơn Trà', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (680, 4, N'Quận Ngũ Hành Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (681, 4, N'Quận Liên Chiểu', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (682, 4, N'Huyện Hoà Vang', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (683, 4, N'Quận Cẩm Lệ', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (684, 3, N'Quận Hồng Bàng', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (685, 5, N'Quận Lê Chân', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (686, 1, N'Quận Ngô Quyền', N'bbbbbbbbbb    bbbbbbbbbbbbbbbbb', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (688, 3, N'Quận Hải An', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (689, 3, N'Quận Đồ Sơn', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (690, 3, N'Huyện An Lão', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (691, 3, N'Huyện Kiến Thụy', N'1111', 1)
GO
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (692, 3, N'Huyện Thủy Nguyên', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (693, 3, N'Huyện An Dương', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (694, 3, N'Huyện Tiên Lãng', N'3333333333333333333333', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (695, 3, N'Huyện Vĩnh Bảo', N'', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (696, 5, N'Huyện  Cát Hải', N'eeee', 1)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (699, 5, N'aaaaaaaaa', N'bbbbbb', 0)
INSERT [dbo].[Sys_District] ([Id], [ProvincialId], [DistrictName], [Note], [Status]) VALUES (700, 1, N'bbbbbbbbbb', N'bbbbbb', 0)
SET IDENTITY_INSERT [dbo].[Sys_District] OFF
SET IDENTITY_INSERT [dbo].[Sys_Exchange_Log_Content] ON 

INSERT [dbo].[Sys_Exchange_Log_Content] ([Id], [LogSubjectId], [LogSubject], [ExchangeLogId], [Title], [Image], [Content_Exchange], [Status], [Status_Processed], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (15, 2, NULL, 0, N'22222aaaaaa', N'icon-english-230527-bX8nMSZnvM.png', N'22222222aaaaaaaaaaaaaaaaaaaa', NULL, N'Active', 1, N'Supper Admin', CAST(N'2023-05-27 04:48:41.277' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-27 06:26:59.187' AS DateTime))
INSERT [dbo].[Sys_Exchange_Log_Content] ([Id], [LogSubjectId], [LogSubject], [ExchangeLogId], [Title], [Image], [Content_Exchange], [Status], [Status_Processed], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (16, 1, NULL, 0, N'11111111', N'', N'1111111111111111111', NULL, NULL, 1, N'Supper Admin', CAST(N'2023-05-27 12:18:12.427' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Exchange_Log_Content] ([Id], [LogSubjectId], [LogSubject], [ExchangeLogId], [Title], [Image], [Content_Exchange], [Status], [Status_Processed], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (17, 1, NULL, 0, N'11111111', N'', N'1111111111111111111', NULL, NULL, 1, N'Supper Admin', CAST(N'2023-05-27 12:18:17.580' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Exchange_Log_Content] ([Id], [LogSubjectId], [LogSubject], [ExchangeLogId], [Title], [Image], [Content_Exchange], [Status], [Status_Processed], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (18, 1, NULL, 0, N'11111111', N'', N'1111111111111111111', NULL, NULL, 1, N'Supper Admin', CAST(N'2023-05-27 12:18:22.307' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_Exchange_Log_Content] OFF
SET IDENTITY_INSERT [dbo].[Sys_Exchange_Log_Subject] ON 

INSERT [dbo].[Sys_Exchange_Log_Subject] ([Id], [Name], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (0, N'---oOo---', 4, N'temp', N'Inactive', NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Exchange_Log_Subject] ([Id], [Name], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, N'Subject 1', 1, N'Subject 1', N'Active', 1, N'Supper Admin', CAST(N'2022-12-01 03:39:03.803' AS DateTime), 1, N'Supper Admin', CAST(N'2022-12-01 03:44:03.327' AS DateTime))
INSERT [dbo].[Sys_Exchange_Log_Subject] ([Id], [Name], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Subject 2', 2, N'Subject 2', N'Active', 1, N'Supper Admin', CAST(N'2022-12-01 03:40:24.497' AS DateTime), 1, N'Supper Admin', CAST(N'2022-12-01 03:43:54.357' AS DateTime))
INSERT [dbo].[Sys_Exchange_Log_Subject] ([Id], [Name], [Ordering], [Description], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (6, N'Subject 3', 3, N'Subject 3', N'Active', 1, N'Supper Admin', CAST(N'2022-12-01 03:44:14.707' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_Exchange_Log_Subject] OFF
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Articles', N'Articles', NULL, N'Blog', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Categories', N'Categories', NULL, N'Blog', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'customers', N'Customers', N'Customers', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'group_Categories', N'Group Categories', N'Group Categories', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'hangHoa', N'hangHoa', N'hangHoa', NULL, 1, 1, N'Supper Admin', CAST(N'2023-08-17 09:58:35.357' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Product', N'Product', N'Product', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Product_Groups', N'Product_Groups', N'Product_Groups', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'sys_companies', N'sys_companies', NULL, N'MySql', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_Company', N'Company', N'Công ty', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'sys_CustomSettings', N'CustomSettings', N'CustomSettings', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_Department', N'Department', N'Phòng ban', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'sys_departments', N'sys_departments', NULL, N'MySql', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_District', N'District', N'Quận huyện', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'sys_Exchange_Log_Content', N'Exchange Log Content', N'Exchange Log Content', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'sys_Exchange_Log_Subject', N'Exchange Log Subject', N'Exchange Log Subject', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_FunctionForPermission', N'Function For Permissions', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_Permission', N'Permission', N'Cấp quyền', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_Position', N'Position', N'Position', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_Role', N'Role', N'Role', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_SystemRights', N'SystemRights', N'SystemRights', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'Sys_User', N'Quản lý tài khoản', N'Quản lý tài khoản', N'Sys', 1, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_FunctionForPermission] ([FunctionName], [Description], [Note], [ModuleSystem], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (N'systemLog', N'systemLog', N'systemLog', NULL, 1, 1, N'Supper Admin', CAST(N'2023-10-25 16:40:17.073' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_Permission] ON 

INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10221, 1, N'customers', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Supper Admin', CAST(N'2023-07-21 03:52:56.047' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10216, 1, N'group_Categories', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Supper Admin', CAST(N'2023-04-27 04:50:22.897' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-29 03:17:46.643' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10218, 1, N'Product', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10217, 1, N'Product_Groups', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (215, 1, N'sys_companies', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, 1, N'Sys_Company', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, 1, N'Sys_Department', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (217, 1, N'sys_departments', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10215, 1, N'sys_Exchange_Log_Subject', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Supper Admin', CAST(N'2022-12-01 03:38:13.693' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (7, 1, N'Sys_Permission', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, 1, N'Sys_Position', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (6, 1, N'Sys_SystemRights', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5, 1, N'Sys_User', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10223, 1, N'systemLog', 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Supper Admin', CAST(N'2023-10-25 16:40:17.093' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (205, 2, N'Sys_Company', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 10:06:12.027' AS DateTime), 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.473' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (206, 2, N'Sys_Department', 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 10:06:12.063' AS DateTime), 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.517' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (213, 2, N'Sys_Permission', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.703' AS DateTime), 1, N'Admin Supper', CAST(N'2022-04-27 08:14:43.357' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (207, 2, N'Sys_Position', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 10:06:12.087' AS DateTime), 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.560' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (212, 2, N'Sys_SystemRights', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.677' AS DateTime), 1, N'Admin Supper', CAST(N'2022-04-27 08:14:03.120' AS DateTime))
INSERT [dbo].[Sys_Permission] ([PermissionId], [UserId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [DateUpdate], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (209, 2, N'Sys_User', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-03-29 10:06:12.133' AS DateTime), 1, N'Admin Supper', CAST(N'2022-03-29 12:36:16.647' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sys_Permission] OFF
SET IDENTITY_INSERT [dbo].[Sys_Position] ON 

INSERT [dbo].[Sys_Position] ([PositionId], [PositionName], [NumericalOrder], [IsManager], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Direction', 1, 1, N'true', NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-29 08:49:29.957' AS DateTime))
INSERT [dbo].[Sys_Position] ([PositionId], [PositionName], [NumericalOrder], [IsManager], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, N'Deputy Director', 2, 1, N'true', NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-29 08:49:05.977' AS DateTime))
INSERT [dbo].[Sys_Position] ([PositionId], [PositionName], [NumericalOrder], [IsManager], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, N'Manager', 3, 1, N'true', NULL, NULL, NULL, 1, N'Admin Supper', CAST(N'2022-03-30 02:02:15.367' AS DateTime))
INSERT [dbo].[Sys_Position] ([PositionId], [PositionName], [NumericalOrder], [IsManager], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (6, N'Personnel', 4, 0, N'true', NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-29 08:48:30.283' AS DateTime))
INSERT [dbo].[Sys_Position] ([PositionId], [PositionName], [NumericalOrder], [IsManager], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (7, N'Public User', 5, 0, N'true', NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2022-11-29 08:48:42.187' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sys_Position] OFF
SET IDENTITY_INSERT [dbo].[Sys_Provincial] ON 

INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (1, N'TP. Hà Nội', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (2, N'TP. Hồ Chí Minh', N'Miền Nam', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (3, N'TP. Hải Phòng', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (4, N'TP. Đà Nẵng', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (5, N'Hà Giang', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (6, N'Cao Bằng', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (7, N'Lai Châu ', N'Miền Bắc fbdsgdsgdsgsd', N'sửa trực tiếp', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (8, N'Lào Cai', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (9, N'Tuyên Quang aaa', N'Miền Bắc', N'dvsvdsgs', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (10, N'Lạng Sơn', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (11, N'Bắc Kạn', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (12, N'Thái Nguyên', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (13, N'Yên Bái', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (14, N'Sơn La', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (15, N'Phú Thọ', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (16, N'Vĩnh Phúc', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (17, N'Quảng Ninh', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (18, N'Bắc Giang', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (20, N'Bắc Ninh', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (21, N'Hải Dương', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (22, N'Hưng Yên', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (23, N'Hòa Bình', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (24, N'Hà Nam', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (25, N'Nam Định', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (26, N'Thái Bình', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (27, N'Ninh Bình', N'Miền Bắc', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (28, N'Thanh Hóa', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (29, N'Nghệ An', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (30, N'Hà Tĩnh', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (31, N'Quảng Bình', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (32, N'Quảng Trị', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (33, N'Thừa Thiên Huế', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (34, N'Quãng Nam', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (35, N'Quãng Ngãi', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (36, N'Kom Tum', N'Tây Nguyên', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (37, N'Binh Định', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (38, N'Gia Lai', N'Tây Nguyên', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (39, N'Phú Yên', N'Miền Trung', N'', 0)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (40, N'Đăk Lăk', N'Tây Nguyên', N'111', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (41, N'Khánh Hòa', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (42, N'Lâm Đồng', N'Tây Nguyên', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (44, N'Bình Dương', N'Miền Nam', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (45, N'Ninh Thuận', N'Miền Trung', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (51, N'An Giang', N'Tây Nam Bộ1', N'2222', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (52, N'Bà Rịa - Vungc Tàu', N'Miền Nam', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (54, N'Kiên Giang', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (55, N'Cần Thơ', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (56, N'Bến Tre', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (57, N'Vĩnh Long', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (58, N'Trà Vinh', N'Tây Nam Bộ', N'aaaaaaaaa', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (59, N'Sóc Trăng', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (60, N'Bạc Liêu', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (61, N'Cà Mau', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (63, N'Hậu Giang', N'Tây Nam Bộ', N'', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (64, N'Đắc   Nông', N'Tây Nguyên', N'bbbb', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (65, N'Đắc   Nông', N'Tây Nguyên', N'bbbb', 1)
INSERT [dbo].[Sys_Provincial] ([Id], [ProvincialName], [Area], [Notes], [Status]) VALUES (66, N'123', N'Tây Nguyên', N'bbbb', 1)
SET IDENTITY_INSERT [dbo].[Sys_Provincial] OFF
SET IDENTITY_INSERT [dbo].[Sys_Role] ON 

INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'Manager', 1, 1, 1, N'Admin Supper', CAST(N'2022-03-10 09:09:09.230' AS DateTime), 13, N'B A', CAST(N'2022-03-10 09:19:36.343' AS DateTime))
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3, N'Admin', 2, 1, 1, N'Admin Supper', CAST(N'2022-03-10 09:11:53.833' AS DateTime), 1, N'Admin Supper', CAST(N'2022-03-30 06:40:28.933' AS DateTime))
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4, N'User', 3, 1, 1, N'Admin Supper', CAST(N'2022-03-10 09:17:30.950' AS DateTime), 13, N'B A', CAST(N'2022-03-10 09:20:01.280' AS DateTime))
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (12, N'Abc13', 123, 1, 1, N'Admin Supper', CAST(N'2022-04-23 02:29:00.167' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (17, N'111111111', 2, 1, 1, N'Admin Supper', CAST(N'2022-04-23 03:22:45.297' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (18, N'333333aaaaa', 3, 1, 1, N'Admin Supper', CAST(N'2022-04-23 07:05:11.047' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-29 02:37:05.557' AS DateTime))
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (19, N'Abc12', 123, 1, 1, N'Admin Supper', CAST(N'2022-04-25 06:28:20.883' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role] ([Id], [Name], [NumericalOrder], [Status], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (20, N'Abc12', 123, 1, 1, N'Admin Supper', CAST(N'2022-04-25 09:25:19.037' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_Role] OFF
SET IDENTITY_INSERT [dbo].[Sys_Role_Permission] ON 

INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2039, 2, N'BaiViet', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Admin Supper', CAST(N'2022-07-23 08:35:46.463' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2040, 2, N'chuDeBaiViet', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Admin Supper', CAST(N'2022-07-23 08:35:52.880' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5046, 2, N'SinhVien', 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2023-06-16 04:38:34.257' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5042, 2, N'sys_Exchange_Log_Content', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2022-12-02 06:57:38.040' AS DateTime), 1, N'Supper Admin', CAST(N'2022-12-02 06:59:09.640' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5039, 2, N'sys_Exchange_Log_Subject', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2022-12-01 03:37:50.990' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2028, 3, N'Articles', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-04-13 07:16:33.227' AS DateTime), NULL, N'Admin Supper', CAST(N'2022-04-13 07:16:47.443' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1027, 3, N'Categories', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-04-02 04:34:06.787' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2031, 3, N'HangHoa', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-04-19 09:10:21.017' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2030, 3, N'LoaiHangHoa', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-04-19 07:18:47.067' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5047, 3, N'SinhVien', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2023-06-16 04:38:58.680' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (9, 3, N'Sys_Company', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, N'B A', CAST(N'2022-03-14 11:08:40.863' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2029, 3, N'sys_CustomSettings', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-04-17 09:51:21.040' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10, 3, N'Sys_Department', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, N'B A', CAST(N'2022-03-14 11:09:57.093' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5040, 3, N'sys_Exchange_Log_Content', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2022-12-02 06:53:15.717' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5041, 3, N'sys_Exchange_Log_Subject', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2022-12-02 06:53:41.970' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (4039, 3, N'Sys_FunctionForPermission', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Admin Supper', CAST(N'2022-09-21 07:58:20.873' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (16, 3, N'Sys_Permission', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, N'B A', CAST(N'2022-03-15 04:26:28.770' AS DateTime), 13, N'B A', CAST(N'2022-03-15 04:28:04.050' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3040, 3, N'sys_permissions', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Admin Supper', CAST(N'2022-09-19 09:17:13.147' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (27, 3, N'Sys_Position', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-03-30 02:01:32.873' AS DateTime), NULL, N'Admin Supper', CAST(N'2022-04-02 04:34:53.867' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2032, 3, N'sys_positions', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-06-01 14:02:04.177' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (15, 3, N'Sys_Provincial', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, N'B A', CAST(N'2022-03-15 04:26:02.767' AS DateTime), 13, N'B A', CAST(N'2022-03-15 04:28:16.593' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (28, 3, N'Sys_Role', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, N'Admin Supper', CAST(N'2022-03-30 06:35:30.200' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-29 02:29:51.667' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (3039, 3, N'sys_roles', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, N'Admin Supper', CAST(N'2022-09-19 09:17:01.877' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (12, 3, N'Sys_Users', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, N'B A', CAST(N'2022-03-14 11:12:06.297' AS DateTime), NULL, N'Admin Supper', CAST(N'2022-03-17 06:36:23.810' AS DateTime))
INSERT [dbo].[Sys_Role_Permission] ([RolePermissionId], [RoleId], [Functions], [FullAuthority], [Addnew], [Updates], [ReadOnly], [FullOfYourself], [Permission1], [Permission2], [Permission3], [Permission4], [Permission5], [Permission6], [Permission7], [Permission8], [Permission9], [Permission10], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (5043, 18, N'Articles', 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, N'Supper Admin', CAST(N'2023-05-27 12:49:19.917' AS DateTime), 1, N'Supper Admin', CAST(N'2023-05-27 12:50:34.577' AS DateTime))
SET IDENTITY_INSERT [dbo].[Sys_Role_Permission] OFF
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (1, N'Toàn quyền hệ thống', N'Toàn quyền hệ thống', 1, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (2, N'Quản trị hệ thống', N'Quản trị hệ thống', 2, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (3, N'Nhân viên hệ thống', N'Nhân viên hệ thống', 3, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (10, N'Theo dõi hệ thống', N'Theo dõi hệ thống', 10, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (11, N'Quản trị đơn vị', N'Quản trị đơn vị', 11, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (12, N'Ban giám đốc', N'Ban giám đốc', 12, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (13, N'Thư ký đơn vị', N'Thư ký đơn vị', 13, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (14, N'Trưởng phó khoa phòng/ban', N'Trưởng phó khoa phòng/ban', 14, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (15, N'Người dùng', N'Người dùng', 15, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (31, N'Quản trị đơn vị', N'Quản trị đơn vị', 31, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (32, N'Ban giám đốc', N'Ban giám đốc', 32, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (33, N'Thư ký đơn vị', N'Thư ký đơn vị', 33, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (34, N'Trưởng phó khoa phòng/ban', N'Trưởng phó khoa phòng/ban', 34, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (35, N'Trưởng/phó nhóm, bộ phận', N'Trưởng/phó nhóm, bộ phận', 35, 1)
INSERT [dbo].[Sys_SystemRights] ([SystemRightsId], [SystemRightsName], [Notes], [NumericalOrder], [Status]) VALUES (36, N'Người dùng', N'Người dùng', 36, 1)
SET IDENTITY_INSERT [dbo].[Sys_User] ON 

INSERT [dbo].[Sys_User] ([UsersId], [EmployeeCode], [CompanyId], [DepartmentId], [PositionId], [LastName], [FirstName], [UserName], [UserName_Encrypted], [Password], [Birthday], [Sex], [Email], [PhoneNumber], [Address], [District], [Provincial], [Nation], [IsManagement], [Status], [LastLoginTime], [Avatar], [ReceiveEmail], [ReceiveSMS], [FullPathTemporarySave], [TemporaryFileName], [PathTemporarySave], [ManagerCode], [LinkChangePassword], [TokenChangePassword], [NotificationTimeChangedPassword], [TimeChangedPassword], [BrowserHeaders], [StatusLogin], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (1, N'TT0001', 1, 3, 2, N'Admin', N'Supper', N'admin', N'0c7540eb7e65b553ec1ba6b20de79608', N'd93a5def7511da3d0f2d171d9c344e91', CAST(N'2022-11-20 17:00:00.000' AS DateTime), N'Female', N'hthaihoa.it12345@gmail.com', N'123', N'Đồng Tháp', NULL, NULL, NULL, NULL, N'true', NULL, N'huong-dung-230603-0KUcMZXIYN.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'', CAST(N'2022-07-14 09:28:38.153' AS DateTime), CAST(N'2022-07-14 04:51:19.010' AS DateTime), NULL, NULL, 13, N'B A', NULL, 1, N'Supper Admin', CAST(N'2023-06-03 09:14:25.477' AS DateTime))
INSERT [dbo].[Sys_User] ([UsersId], [EmployeeCode], [CompanyId], [DepartmentId], [PositionId], [LastName], [FirstName], [UserName], [UserName_Encrypted], [Password], [Birthday], [Sex], [Email], [PhoneNumber], [Address], [District], [Provincial], [Nation], [IsManagement], [Status], [LastLoginTime], [Avatar], [ReceiveEmail], [ReceiveSMS], [FullPathTemporarySave], [TemporaryFileName], [PathTemporarySave], [ManagerCode], [LinkChangePassword], [TokenChangePassword], [NotificationTimeChangedPassword], [TimeChangedPassword], [BrowserHeaders], [StatusLogin], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (2, N'TT0002', 1, 1, 3, N'Hiddleston', N'Tom', N'tom', N'd5265b9e229d4e032a32004b4a61876b', N'd93a5def7511da3d0f2d171d9c344e91', NULL, N'Male', N'tom@gmail.com', N'123', NULL, NULL, NULL, NULL, NULL, N'true', NULL, N'', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 13, N'B A', NULL, 1, N'Supper Admin', CAST(N'2023-05-27 07:06:45.290' AS DateTime))
INSERT [dbo].[Sys_User] ([UsersId], [EmployeeCode], [CompanyId], [DepartmentId], [PositionId], [LastName], [FirstName], [UserName], [UserName_Encrypted], [Password], [Birthday], [Sex], [Email], [PhoneNumber], [Address], [District], [Provincial], [Nation], [IsManagement], [Status], [LastLoginTime], [Avatar], [ReceiveEmail], [ReceiveSMS], [FullPathTemporarySave], [TemporaryFileName], [PathTemporarySave], [ManagerCode], [LinkChangePassword], [TokenChangePassword], [NotificationTimeChangedPassword], [TimeChangedPassword], [BrowserHeaders], [StatusLogin], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (29, N'000', 1, 5, 7, N'Huỳnh Thái', N'Hòa', N'hthaihoa.it', N'f15f0740bc3455ec6acbdd23e249cc10', N'd93a5def7511da3d0f2d171d9c344e91', NULL, NULL, N'hthaihoa.it@gmail.com', N'0889978953', NULL, NULL, NULL, NULL, NULL, N'true', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Sys_User] ([UsersId], [EmployeeCode], [CompanyId], [DepartmentId], [PositionId], [LastName], [FirstName], [UserName], [UserName_Encrypted], [Password], [Birthday], [Sex], [Email], [PhoneNumber], [Address], [District], [Provincial], [Nation], [IsManagement], [Status], [LastLoginTime], [Avatar], [ReceiveEmail], [ReceiveSMS], [FullPathTemporarySave], [TemporaryFileName], [PathTemporarySave], [ManagerCode], [LinkChangePassword], [TokenChangePassword], [NotificationTimeChangedPassword], [TimeChangedPassword], [BrowserHeaders], [StatusLogin], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (30, N'12345', 1, 2, 3, N'123', N'ểwgweg', N'abcde', N'95f06eb5dc809c1cad88beb7e4565869', N'8843028fefce50a6de50acdf064ded27', NULL, N'Male', N'hoa.huynh@vinhhoan.com', N'1234567890', NULL, NULL, NULL, NULL, NULL, N'false', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Supper Admin', CAST(N'2023-05-27 11:52:40.273' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_User] OFF
SET IDENTITY_INSERT [dbo].[Sys_User_Role] ON 

INSERT [dbo].[Sys_User_Role] ([Id], [IdRole], [UsersId], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (7, 2, 1, 13, N'B A', CAST(N'2022-03-13 07:10:32.120' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_User_Role] ([Id], [IdRole], [UsersId], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (6, 3, 1, 13, N'B A', CAST(N'2022-03-13 07:08:45.860' AS DateTime), NULL, NULL, NULL)
INSERT [dbo].[Sys_User_Role] ([Id], [IdRole], [UsersId], [User_Id_Created], [User_Name_Created], [DateTime_Created], [User_Id_Modified], [User_Name_Modified], [DateTime_Modified]) VALUES (10, 4, 1, 13, N'B A', CAST(N'2022-03-13 07:19:30.427' AS DateTime), NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Sys_User_Role] OFF
ALTER TABLE [dbo].[Articles]  WITH CHECK ADD  CONSTRAINT [FK_Articles_Categories] FOREIGN KEY([CategorieId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Articles] CHECK CONSTRAINT [FK_Articles_Categories]
GO
ALTER TABLE [dbo].[Sys_Department]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Department_Sys_Company] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Sys_Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Sys_Department] CHECK CONSTRAINT [FK_Sys_Department_Sys_Company]
GO
ALTER TABLE [dbo].[Sys_District]  WITH CHECK ADD  CONSTRAINT [FK_Sys_District_Sys_Provincial] FOREIGN KEY([ProvincialId])
REFERENCES [dbo].[Sys_Provincial] ([Id])
GO
ALTER TABLE [dbo].[Sys_District] CHECK CONSTRAINT [FK_Sys_District_Sys_Provincial]
GO
ALTER TABLE [dbo].[Sys_Exchange_Log_Content]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Exchange_Log_Content_Sys_Exchange_Log_Subject] FOREIGN KEY([LogSubjectId])
REFERENCES [dbo].[Sys_Exchange_Log_Subject] ([Id])
GO
ALTER TABLE [dbo].[Sys_Exchange_Log_Content] CHECK CONSTRAINT [FK_Sys_Exchange_Log_Content_Sys_Exchange_Log_Subject]
GO
ALTER TABLE [dbo].[Sys_Exchange_Log_Content]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Exchange_Log_Content_Sys_User] FOREIGN KEY([User_Id_Created])
REFERENCES [dbo].[Sys_User] ([UsersId])
GO
ALTER TABLE [dbo].[Sys_Exchange_Log_Content] CHECK CONSTRAINT [FK_Sys_Exchange_Log_Content_Sys_User]
GO
ALTER TABLE [dbo].[Sys_Permission]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Permission_Sys_FunctionForPermission] FOREIGN KEY([Functions])
REFERENCES [dbo].[Sys_FunctionForPermission] ([FunctionName])
GO
ALTER TABLE [dbo].[Sys_Permission] CHECK CONSTRAINT [FK_Sys_Permission_Sys_FunctionForPermission]
GO
ALTER TABLE [dbo].[Sys_Permission]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Permission_Sys_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[Sys_User] ([UsersId])
GO
ALTER TABLE [dbo].[Sys_Permission] CHECK CONSTRAINT [FK_Sys_Permission_Sys_User]
GO
ALTER TABLE [dbo].[Sys_Role_Permission]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Permission_Sys_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Sys_Role] ([Id])
GO
ALTER TABLE [dbo].[Sys_Role_Permission] CHECK CONSTRAINT [FK_Sys_Role_Permission_Sys_Role]
GO
ALTER TABLE [dbo].[Sys_User]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Users_Sys_Company] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Sys_Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Sys_User] CHECK CONSTRAINT [FK_Sys_Users_Sys_Company]
GO
ALTER TABLE [dbo].[Sys_User]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Users_Sys_Department] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[Sys_Department] ([DepartmentId])
GO
ALTER TABLE [dbo].[Sys_User] CHECK CONSTRAINT [FK_Sys_Users_Sys_Department]
GO
ALTER TABLE [dbo].[Sys_User]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Users_Sys_Position] FOREIGN KEY([PositionId])
REFERENCES [dbo].[Sys_Position] ([PositionId])
GO
ALTER TABLE [dbo].[Sys_User] CHECK CONSTRAINT [FK_Sys_Users_Sys_Position]
GO
ALTER TABLE [dbo].[Sys_User_Role]  WITH CHECK ADD  CONSTRAINT [FK_Sys_User_Role_Sys_Role] FOREIGN KEY([IdRole])
REFERENCES [dbo].[Sys_Role] ([Id])
GO
ALTER TABLE [dbo].[Sys_User_Role] CHECK CONSTRAINT [FK_Sys_User_Role_Sys_Role]
GO
ALTER TABLE [dbo].[Sys_User_Role]  WITH CHECK ADD  CONSTRAINT [FK_Sys_User_Role_Sys_User] FOREIGN KEY([UsersId])
REFERENCES [dbo].[Sys_User] ([UsersId])
GO
ALTER TABLE [dbo].[Sys_User_Role] CHECK CONSTRAINT [FK_Sys_User_Role_Sys_User]
GO
/****** Object:  StoredProcedure [dbo].[Sys_District_Pager]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sys_District_Pager]
	@PageIndex INT = 1
	,@PageSize INT = 30
	,@RecordCount INT OUTPUT
	, @Id  bigint
	, @ProvincialId  bigint
	, @DistrictName  nvarchar (200)
	, @Note  nvarchar (200)
	, @Status  int
AS
BEGIN
	if(@Id = 0) begin set @Id = null end 
	if(@ProvincialId = 0) begin set @ProvincialId = null end 
	if(@DistrictName = '') begin set @DistrictName = null end 
	if(@Note = '') begin set @Note = null end 
	if(@Status = 0) begin set @Status = null end 
	SET NOCOUNT ON;
	SELECT ROW_NUMBER() OVER
	(
		ORDER BY @DistrictName  asc 
	)AS RowNumber
	,Id
	,ProvincialId
	,DistrictName
	,Note
	,Status
	INTO #Results
	FROM Sys_District
	where (Id>0)
		AND (Id = IsNull(@Id, Id))
		AND (ProvincialId = IsNull(@ProvincialId, ProvincialId))
		AND (@DistrictName IS NULL OR DistrictName  LIKE '%' + @DistrictName + '%' )
		AND (@Note IS NULL OR Note  LIKE '%' + @Note + '%' )
		AND (Status = IsNull(@Status, Status))
	SELECT @RecordCount = COUNT(*)
	FROM #Results
	SELECT * FROM #Results
	WHERE (RowNumber BETWEEN(@PageIndex -1) * @PageSize + 1 AND(((@PageIndex -1) * @PageSize + 1) + @PageSize) - 1)
	DROP TABLE #Results
END


GO
/****** Object:  StoredProcedure [dbo].[Sys_Permission_Pager]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sys_Permission_Pager]
	@PageIndex INT = 1
	,@PageSize INT = 30
	,@RecordCount INT OUTPUT
	--, @PermissionId  bigint
	--, @PersonAllocationPermission  bigint
	, @UserId  bigint
	, @Functions  nvarchar (200)
	--, @AllRight  int
	--, @Addnew  int
	--, @Updates  int
	--, @ReadOnly  int
	--, @FullOfYourself  int
	--, @Permission1  int
	--, @Permission2  int
	--, @Permission3  int
	--, @Permission4  int
	--, @Permission5  int
	--, @Permission6  int
	--, @Permission7  int
	--, @Permission8  int
	--, @Permission9  int
	--, @Permission10  int
	--, @DateUpdate  datetime
AS
BEGIN
	--if(@PermissionId = 0) begin set @PermissionId = null end 
	--if(@PersonAllocationPermission = 0) begin set @PersonAllocationPermission = null end 
	if(@UserId = 0) begin set @UserId = null end 
	if(@Functions = '') begin set @Functions = null end 
	--if(@AllRight = 0) begin set @AllRight = null end 
	--if(@Addnew = 0) begin set @Addnew = null end 
	--if(@Updates = 0) begin set @Updates = null end 
	--if(@ReadOnly = 0) begin set @ReadOnly = null end 
	--if(@FullOfYourself = 0) begin set @FullOfYourself = null end 
	--if(@Permission1 = 0) begin set @Permission1 = null end 
	--if(@Permission2 = 0) begin set @Permission2 = null end 
	--if(@Permission3 = 0) begin set @Permission3 = null end 
	--if(@Permission4 = 0) begin set @Permission4 = null end 
	--if(@Permission5 = 0) begin set @Permission5 = null end 
	--if(@Permission6 = 0) begin set @Permission6 = null end 
	--if(@Permission7 = 0) begin set @Permission7 = null end 
	--if(@Permission8 = 0) begin set @Permission8 = null end 
	--if(@Permission9 = 0) begin set @Permission9 = null end 
	--if(@Permission10 = 0) begin set @Permission10 = null end 
	--if(@DateUpdate = 0) begin set @DateUpdate = null end 
	SET NOCOUNT ON;
	SELECT ROW_NUMBER() OVER
	(
		ORDER BY p.PermissionId  DESC 
	)AS RowNumber
	,p.PermissionId
	,(us.LastName +' '+ us.FirstName) as UserId		
	,p.Functions
	,p.AllRight
	,p.Addnew
	,p.Updates
	,p.ReadOnly
	,p.FullOfYourself
	,p.Permission1
	,p.Permission2
	,p.Permission3
	,p.Permission4
	,p.Permission5
	,p.Permission6
	,p.Permission7
	,p.Permission8
	,p.Permission9
	,p.Permission10	
	,(uc.LastName +' '+ uc.FirstName) as PersonAllocationPermission
	,REPLACE(str(datepart(HOUR, p.DateUpdate)) +'h:'+str(datepart(minute, p.DateUpdate)),' ','') + ' ngày '+convert(varchar, p.DateUpdate, 103) as DateUpdate
	INTO #Results
	FROM Sys_Permission p
	left join Sys_Users  us on p.UserId = us.UsersId
	left join Sys_Users  uc on p.PersonAllocationPermission = uc.UsersId

	where (p.PermissionId>0)	
		
		AND (UserId = IsNull(@UserId, UserId))
		AND (@Functions IS NULL OR p.Functions  LIKE '%' + @Functions + '%' )
		--AND (AllRight = IsNull(@AllRight, AllRight))
		--AND (Addnew = IsNull(@Addnew, Addnew))
		--AND (Updates = IsNull(@Updates, Updates))
		--AND (ReadOnly = IsNull(@ReadOnly, ReadOnly))
		--AND (FullOfYourself = IsNull(@FullOfYourself, FullOfYourself))
		--AND (Permission1 = IsNull(@Permission1, Permission1))
		--AND (Permission2 = IsNull(@Permission2, Permission2))
		--AND (Permission3 = IsNull(@Permission3, Permission3))
		--AND (Permission4 = IsNull(@Permission4, Permission4))
		--AND (Permission5 = IsNull(@Permission5, Permission5))
		--AND (Permission6 = IsNull(@Permission6, Permission6))
		--AND (Permission7 = IsNull(@Permission7, Permission7))
		--AND (Permission8 = IsNull(@Permission8, Permission8))
		--AND (Permission9 = IsNull(@Permission9, Permission9))
		--AND (Permission10 = IsNull(@Permission10, Permission10))
		--//AND (DateUpdate = IsNull(@DateUpdate, DateUpdate))
	SELECT @RecordCount = COUNT(*)
	FROM #Results
	SELECT * FROM #Results
	WHERE (RowNumber BETWEEN(@PageIndex -1) * @PageSize + 1 AND(((@PageIndex -1) * @PageSize + 1) + @PageSize) - 1)
	DROP TABLE #Results
END

GO
/****** Object:  StoredProcedure [dbo].[Sys_Provincial_Pager]    Script Date: 26/10/2023 9:36:38 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Sys_Provincial_Pager]
	@PageIndex INT = 1
	,@PageSize INT = 50
	,@RecordCount INT OUTPUT
	, @Id  bigint
	, @ProvincialName  nvarchar (200)
	, @Area  nvarchar (200)
	, @Notes  nvarchar (200)
	, @Status  int
AS
BEGIN
	if(@Id = 0) begin set @Id = null end 
	if(@ProvincialName = '') begin set @ProvincialName = null end 
	if(@Area = '') begin set @Area = null end 
	if(@Notes = '') begin set @Notes = null end 
	if(@Status = 0) begin set @Status = null end 
	SET NOCOUNT ON;
	SELECT ROW_NUMBER() OVER
	(
		ORDER BY Id  DESC 
	)AS RowNumber
	,Id
	,ProvincialName
	,Area
	,Notes
	,Status
	INTO #Results
	FROM Sys_Provincial
	where (Id>0)
		AND (Id = IsNull(@Id, Id))
		AND (@ProvincialName IS NULL OR ProvincialName  LIKE '%' + @ProvincialName + '%' )
		AND (@Area IS NULL OR Area  LIKE '%' + @Area + '%' )
		AND (@Notes IS NULL OR Notes  LIKE '%' + @Notes + '%' )
		AND (Status = IsNull(@Status, Status))
	SELECT @RecordCount = COUNT(*)
	FROM #Results
	SELECT * FROM #Results
	WHERE (RowNumber BETWEEN(@PageIndex -1) * @PageSize + 1 AND(((@PageIndex -1) * @PageSize + 1) + @PageSize) - 1)
	DROP TABLE #Results
END

GO
USE [master]
GO
ALTER DATABASE [FutureOffice] SET  READ_WRITE 
GO
